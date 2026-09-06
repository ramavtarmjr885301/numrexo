import axios, { AxiosResponse } from 'axios';
import { CALCULATORS_REGISTRY, CalculatorType } from '@/data/calculatorsRegistry';
import useSWR from 'swr';
const fetcher = (url: string) => fetch(url).then(res => res.json());

export function usePosts(page: number = 1, perPage: number = 9) {
    const { data, error } = useSWR(
        `${WP_API_URL}/posts?page=${page}&per_page=${perPage}&_embed=true`,
        fetcher
    );

    return {
        posts: data || [],
        isLoading: !error && !data,
        isError: error
    };
}
// Types
export interface WPPost {
    id: number;
    date: string;
    modified: string;
    slug: string;
    status: string;
    type: string;
    link: string;
    title: { rendered: string };
    content: { rendered: string };
    excerpt: { rendered: string };
    categories: number[];
    featured_media: number;
    yoast_head_json?: {
        title?: string;
        description?: string;
        og_title?: string;
        og_description?: string;
        twitter_card?: string;
    };
    _embedded?: {
        author?: Array<{ name: string }>;
        'wp:featuredmedia'?: Array<{
            source_url: string;
            alt_text: string;
            caption: { rendered: string };
        }>;
    };
}

export interface WPCategory {
    id: number;
    count: number;
    description: string;
    link: string;
    name: string;
    slug: string;
    parent: number;
}

export interface WPPostsResponse {
    posts: WPPost[];
    total: number;
    totalPages: number;
    currentPage: number;
}

export interface FeaturedImage {
    url: string;
    alt: string;
    caption: string;
}

// Environment variable
const WP_API_URL = process.env.NEXT_PUBLIC_WP_API_URL || 'https://blog.numrexo.com/wp-json/wp/v2';

/**
 * WHY THIS EXISTS
 *
 * Every call below used bare `axios.get(...)` with no timeout. Axios waits
 * forever by default, so whenever blog.numrexo.com was slow or down, the
 * Next.js static-generation worker hung, Next killed it after 60 seconds,
 * retried three times, and the whole production build failed with:
 *
 *   "Static page generation for /blog/... is still timing out after 3 attempts"
 *
 * The blog is a nice-to-have; it must never be able to take the calculators
 * offline. So: every request gets a hard timeout, and every method returns a
 * safe empty value instead of throwing. A blog outage now means the blog pages
 * are empty for that build, not a failed deploy.
 */
const WP_TIMEOUT_MS = Number(process.env.WP_API_TIMEOUT_MS || 8000);

const wpApi = axios.create({
    baseURL: WP_API_URL,
    timeout: WP_TIMEOUT_MS,
    headers: { Accept: 'application/json' },
});

/** Runs a WordPress request and falls back to `fallback` on any failure. */
async function safeWp<T>(label: string, run: () => Promise<T>, fallback: T): Promise<T> {
    try {
        return await run();
    } catch (error) {
        const reason = error instanceof Error ? error.message : String(error);
        console.warn(`[wordpress] ${label} failed (${reason}) - continuing without blog data.`);
        return fallback;
    }
}

// WordPress API Client
export const wpClient = {
    getPosts: async (params: any = {}): Promise<WPPost[]> =>
        safeWp('getPosts', async () => {
            const response: AxiosResponse<WPPost[]> = await wpApi.get('/posts', {
                params: {
                    _embed: true,
                    status: 'publish',
                    ...params,
                },
            });
            return response.data;
        }, []),

    getPostBySlug: async (slug: string): Promise<WPPost | null> =>
        safeWp(`getPostBySlug(${slug})`, async () => {
            const response: AxiosResponse<WPPost[]> = await wpApi.get('/posts', {
                params: {
                    slug: slug,
                    _embed: true,
                },
            });
            return response.data[0] || null;
        }, null),

    getPostById: async (id: number): Promise<WPPost> => {
        const response: AxiosResponse<WPPost> = await wpApi.get(`/posts/${id}`, {
            params: {
                _embed: true,
            },
        });
        return response.data;
    },

    getCategories: async (): Promise<WPCategory[]> =>
        safeWp('getCategories', async () => {
            const response: AxiosResponse<WPCategory[]> = await wpApi.get('/categories');
            return response.data;
        }, []),

    getPostsByCategory: async (categoryId: number): Promise<WPPost[]> =>
        safeWp(`getPostsByCategory(${categoryId})`, async () => {
            const response: AxiosResponse<WPPost[]> = await wpApi.get('/posts', {
                params: {
                    categories: categoryId,
                    _embed: true,
                },
            });
            return response.data;
        }, []),

    getFeaturedPosts: async (limit: number = 3): Promise<WPPost[]> =>
        safeWp('getFeaturedPosts', async () => {
            const response: AxiosResponse<WPPost[]> = await wpApi.get('/posts', {
                params: {
                    per_page: limit,
                    _embed: true,
                    order: 'desc',
                    orderby: 'date',
                },
            });
            return response.data;
        }, []),

    getPostsWithPagination: async (page: number = 1, perPage: number = 9): Promise<WPPostsResponse> =>
        safeWp('getPostsWithPagination', async () => {
            const response: AxiosResponse<WPPost[]> = await wpApi.get('/posts', {
                params: {
                    page: page,
                    per_page: perPage,
                    _embed: true,
                    status: 'publish',
                },
            });

            return {
                posts: response.data,
                total: parseInt(response.headers['x-wp-total'] as string) || 0,
                totalPages: parseInt(response.headers['x-wp-totalpages'] as string) || 0,
                currentPage: page,
            };
        }, { posts: [], total: 0, totalPages: 0, currentPage: page }),
};

// ✅ Helper function to get featured image
export function getFeaturedImage(post: WPPost): FeaturedImage | null {
    if (post._embedded && post._embedded['wp:featuredmedia']) {
        const media = post._embedded['wp:featuredmedia'][0];
        return {
            url: media.source_url,
            alt: media.alt_text || post.title.rendered,
            caption: media.caption?.rendered || '',
        };
    }
    return null;
}

// ✅ Helper function to get author name
export function getAuthorName(post: WPPost): string {
    if (post._embedded && post._embedded.author) {
        return post._embedded.author[0].name;
    }
    return 'Numrexo Team';
}

// ✅ Helper function to format date
export function formatWpDate(dateString: string): string {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    }).format(date);
}

// ✅ Helper function to get meta title from Yoast
export function getMetaTitle(post: WPPost): string {
    if (post.yoast_head_json?.title) {
        return post.yoast_head_json.title;
    }
    return post.title.rendered;
}

// ✅ Helper function to get meta description from Yoast
export function getMetaDescription(post: WPPost): string {
    if (post.yoast_head_json?.description) {
        return post.yoast_head_json.description;
    }
    return post.excerpt.rendered.replace(/<[^>]+>/g, '');
}


// Category to calculator ID mapping
const CATEGORY_CALCULATOR_MAP: Record<string, string[]> = {
    'finance': ['home-loan-emi', 'personal-loan-emi', 'car-loan-emi', 'bike-loan-emi', 'consumer-loan-emi', 'home-loan-eligibility', 'amortization', 'credit-score-estimator', 'loan-prepayment', 'emi', 'cagr', 'mortgage'],
    'home-loan': ['home-loan-emi', 'home-loan-eligibility', 'amortization', 'loan-prepayment', 'mortgage'],
    'car-loan': ['car-loan-emi', 'amortization', 'loan-prepayment', 'emi'],
    'bike-loan': ['bike-loan-emi', 'amortization', 'loan-prepayment', 'emi'],
    'personal-loan': ['personal-loan-emi', 'amortization', 'loan-prepayment', 'emi'],
    'consumer-loan': ['consumer-loan-emi', 'amortization', 'loan-prepayment', 'emi'],
    'investment': ['sip', 'lumpsum', 'ppf', 'nps', 'swp', 'capm', 'xirr', 'cagr'],
    'tax': ['ltcg', 'property-tax', 'vat', 'sales-tax', 'gst'],
    'health': ['bmi', 'ideal-weight', 'water-intake', 'body-type', 'pregnancy-due', 'ovulation', 'sleep', 'calorie-counter'],
    'fitness': ['bmr', 'body-fat', 'calorie-burn', 'pace'],
    'math': ['percentage', 'age', 'fraction', 'decimal', 'ratio', 'pythagorean', 'area', 'volume', 'slope', 'quadratic', 'mean-median-mode', 'distance', 'population'],
    'conversion': ['currency-converter', 'unit-converter', 'length-converter', 'weight-converter', 'temperature-converter', 'area-converter', 'volume-converter', 'speed-converter', 'time-converter', 'data-converter', 'pressure-converter', 'energy-converter', 'power-converter', 'angle-converter'],
    'education': ['gpa', 'cgpa', 'grade', 'weighted-grade', 'final-grade', 'college-cost', 'scholarship', 'attendance', 'percentage-marks'],
    'construction': ['carpet-area', 'built-up-area', 'concrete', 'paint', 'flooring', 'wallpaper', 'roofing', 'land-area'],
    'business': ['profit-margin', 'markup', 'discount', 'roi', 'break-even', 'invoice', 'tip', 'sales-commission'],
    'cooking': ['recipe-converter', 'cooking-time', 'oven-temperature', 'baking-converter', 'food-expiry'],
    'travel': ['fuel-cost', 'travel-budget', 'flight-time', 'hotel-cost', 'luggage-allowance'],
    'time': ['date-difference', 'add-days', 'work-days', 'time-duration', 'birthday-countdown', 'stopwatch', 'timer'],
    'science': ['distance-speed-time'],
    'uncategorized': ['bmi', 'percentage', 'age'],
};

export async function getRelatedCalculators(categorySlug: string, limit: number = 4): Promise<CalculatorType[]> {
    // Get calculator IDs for this category
    const calculatorIds = CATEGORY_CALCULATOR_MAP[categorySlug] || CATEGORY_CALCULATOR_MAP['finance'];

    // Get calculators from registry
    const calculators = calculatorIds
        .map(id => CALCULATORS_REGISTRY.find(calc => calc.id === id))
        .filter((calc): calc is CalculatorType => calc !== undefined)
        .slice(0, limit);

    return calculators;
}