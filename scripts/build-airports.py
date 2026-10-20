#!/usr/bin/env python3
"""
Builds public/data/airports.json for the Flight Time Calculator.

Source: the `airportsdata` Python package (MIT licence), which is derived from
OurAirports (public domain) and the IATA/ICAO code lists. Only airports that
have an IATA code are kept (about 7,900).

Run (optional, the generated file is committed to the repo):
    pip install airportsdata
    python3 scripts/build-airports.py

Output format (one array per airport, to keep the file small):
    [iata, name, city, region, countryCode, lat, lon, tzIndex, major, icao]
and a top-level "tz" array holding the time-zone names the tzIndex values point to.
"""
import json, os, sys
import airportsdata

# Airports a typical traveller expects to see first: the busiest passenger
# airports worldwide plus every US large/medium hub and the main airport of
# each big city. Used only to rank search results and to choose a sensible
# "nearest airport" - every airport with an IATA code is still searchable.
MAJOR = """
ATL LAX ORD DFW DEN JFK SFO SEA LAS MCO EWR CLT PHX MIA IAH BOS MSP FLL DTW PHL LGA BWI SLC DCA SAN IAD TPA BNA AUS MDW HNL DAL STL PDX SMF OAK SJC MCI RDU SNA SAT MSY CLE PIT IND CMH CVG MKE BUR ONT JAX OGG RSW SDF ABQ OMA BUF ANC PBI RIC BOI ALB TUL OKC MEM SJU CHS GRR GSO BDL PVD ELP TUS SAV PSP LIH KOA ITO BHM DSM LIT MSN COS ORF PNS CAK
YYZ YVR YUL YYC YEG YOW YWG YHZ YQB
MEX CUN GDL MTY TIJ SJD PVR GUA SAL SJO PTY HAV SDQ PUJ NAS MBJ KIN BGI AUA CUR
GRU GIG BSB CNF POA CWB SSA REC FOR EZE AEP SCL LIM BOG MDE CLO UIO GYE CCS MVD ASU LPB VCP
LHR LGW STN LTN LCY MAN EDI BHX GLA BRS NCL BFS DUB ORK SNN
CDG ORY NCE LYS MRS TLS BOD NTE
FRA MUC BER DUS HAM CGN STR HAJ NUE LEJ
AMS BRU EIN LUX
MAD BCN AGP PMI ALC VLC SVQ IBZ TFS LPA BIO
LIS OPO FAO FNC
FCO MXP LIN VCE NAP BLQ FLR PSA CTA PMO BGY TRN CIA
ZRH GVA BSL VIE SZG CPH ARN GOT OSL BGO TRD HEL KEF
WAW KRK PRG BUD OTP SOF BEG ZAG LJU ATH SKG HER RHO CFU
IST SAW AYT ESB ADB SVO DME VKO LED KBP IEV TBS EVN GYD
DXB AUH SHJ DOH DWC BAH KWI MCT RUH JED DMM MED AMM TLV BEY BGW IKA THR
CAI HRG SSH CMN RAK TUN ALG ADD NBO MBA JNB CPT DUR LOS ABV ACC DKR ABJ DAR EBB KGL LUN HRE MRU TNR WDH GBE
DEL BOM BLR MAA CCU HYD AMD COK GOI PNQ JAI LKO TRV GAU IXC PAT BBI IDR NAG CJB VTZ SXR ATQ IXB VNS IXR BHO UDR IXM
CMB MLE KTM DAC CGP ISB LHE KHI PEW RWP
PEK PKX PVG SHA CAN SZX CTU TFU CKG KMG XIY HGH NKG WUH CSX TAO DLC SHE TSN XMN FOC URC HRB HAK SYX
HKG MFM TPE TSA KHH
HND NRT KIX ITM NGO FUK CTS OKA KOJ HIJ SDJ KMJ
ICN GMP PUS CJU
BKK DMK HKT CNX USM KBV SIN KUL PEN LGK BKI KCH CGK DPS SUB UPG MNL CEB DVO CRK SGN HAN DAD CXR PNH REP VTE RGN ULN
SYD MEL BNE PER ADL CBR OOL CNS DRW HBA AKL WLG CHC ZQN NAN PPT NOU GUM POM
""".split()

# The dataset's names/cities are sometimes abbreviated or point at a suburb.
# These overrides make the big airports read the way travellers know them.
NAME_FIX = {
    "JFK": "John F. Kennedy International Airport",
    "LGA": "LaGuardia Airport",
    "IAH": "George Bush Intercontinental Airport",
    "DCA": "Ronald Reagan Washington National Airport",
    "HKG": "Hong Kong International Airport",
    "SIN": "Singapore Changi Airport",
    "DFW": "Dallas/Fort Worth International Airport",
    "HND": "Tokyo Haneda Airport",
    "NRT": "Tokyo Narita International Airport",
    "ATL": "Hartsfield-Jackson Atlanta International Airport",
    "BLR": "Kempegowda International Airport",
    "BOM": "Chhatrapati Shivaji Maharaj International Airport",
    "FCO": "Rome Fiumicino (Leonardo da Vinci) Airport",
    "SJC": "San Jose Mineta International Airport",
    "GRU": "Sao Paulo/Guarulhos International Airport",
    "MXP": "Milan Malpensa Airport",
    "YYZ": "Toronto Pearson International Airport",
    "ICN": "Seoul Incheon International Airport",
    "OAK": "Oakland International Airport",
    "LGB": "Long Beach Airport",
    "BUR": "Hollywood Burbank Airport",
    "PKX": "Beijing Daxing International Airport",
    "PEK": "Beijing Capital International Airport",
    "MDW": "Chicago Midway International Airport",
    "MCO": "Orlando International Airport",
    "DEL": "Indira Gandhi International Airport",
    "LHR": "London Heathrow Airport",
    "LGW": "London Gatwick Airport",
    "STN": "London Stansted Airport",
    "LTN": "London Luton Airport",
    "LCY": "London City Airport",
    "CDG": "Paris Charles de Gaulle Airport",
    "ORY": "Paris Orly Airport",
    "AUH": "Abu Dhabi Zayed International Airport",
}
CITY_FIX = {
    "YYZ": "Toronto", "EWR": "Newark", "DFW": "Dallas-Fort Worth",
    "DEL": "New Delhi", "GRU": "Sao Paulo", "VCP": "Campinas",
}

# A few dozen airports embedded in the page code itself, so the calculator shows a
# real answer (and the popular-routes table) in the server-rendered HTML before the
# full airports.json has downloaded.
SEED = """
JFK LHR LAX HNL ORD ATL HND CDG FRA FCO MEX DEL BOM DXB SIN SYD SFO MIA DFW DEN SEA LAS BOS YYZ AMS MAD IST BKK HKG ICN DOH CPT GRU MUC ZRH
""".split()


def main():
    data = airportsdata.load("IATA")
    tzs, tz_idx = [], {}
    rows = []
    major = set(MAJOR)
    missing = sorted(c for c in major if c not in data)
    if missing:
        print("WARNING: major codes not in dataset:", " ".join(missing), file=sys.stderr)
    for code in sorted(data):
        a = data[code]
        tz = a.get("tz") or ""
        if tz not in tz_idx:
            tz_idx[tz] = len(tzs)
            tzs.append(tz)
        rows.append([
            code,
            NAME_FIX.get(code, a["name"].strip()),
            CITY_FIX.get(code, (a.get("city") or "").strip()),
            (a.get("subd") or "").strip(),
            a["country"],
            round(float(a["lat"]), 4),
            round(float(a["lon"]), 4),
            tz_idx[tz],
            1 if code in major else 0,
            a.get("icao") or "",
        ])
    out = os.path.join(os.path.dirname(__file__), "..", "public", "data", "airports.json")
    with open(out, "w", encoding="utf-8") as f:
        json.dump({"v": 1, "tz": tzs, "a": rows}, f, ensure_ascii=False, separators=(",", ":"))
    # TypeScript seed file
    seed_rows = [r for r in rows if r[0] in set(SEED)]
    seed_rows.sort(key=lambda r: SEED.index(r[0]))
    ts = ["// GENERATED by scripts/build-airports.py - do not edit by hand.",
          "// Airports embedded in the page so the first render has real data.",
          "import type { Airport } from \"./airports\";", "",
          "export const SEED_AIRPORTS: Airport[] = ["]
    for r in seed_rows:
        ts.append("  " + json.dumps({"iata": r[0], "icao": r[9], "name": r[1], "city": r[2], "region": r[3], "cc": r[4],
                                     "lat": r[5], "lon": r[6], "tz": tzs[r[7]], "major": True}, ensure_ascii=False) + ",")
    ts.append("];")
    ts.append("")
    seed_out = os.path.join(os.path.dirname(__file__), "..", "lib", "flight", "seed.ts")
    with open(seed_out, "w", encoding="utf-8") as f:
        f.write("\n".join(ts))
    print(len(rows), "airports,", len(tzs), "time zones,", sum(r[8] for r in rows), "major ->", os.path.getsize(out) // 1024, "KB")

if __name__ == "__main__":
    main()
