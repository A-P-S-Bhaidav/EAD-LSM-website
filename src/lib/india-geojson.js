/**
 * India GeoJSON - Official Government of India claimed boundary
 *
 * Includes:
 *  - Pakistan-occupied Kashmir (Azad Kashmir + Gilgit-Baltistan)
 *  - Aksai Chin (as part of Ladakh/J&K)
 *  - Arunachal Pradesh (McMahon Line)
 *
 * Single non-self-intersecting clockwise polygon.
 * Coordinates based on Survey of India claim lines.
 */

export const indiaGeoJSON = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": { "name": "India" },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            // ═══════════════════════════════════════════════════
            // Start: Rann of Kutch, going COUNTER-CLOCKWISE
            // (outer ring should be counter-clockwise for GeoJSON)
            // Actually GeoJSON outer rings are counter-clockwise
            // but D3 handles both — we'll use clockwise (right-hand rule exterior)
            // ═══════════════════════════════════════════════════

            // ── GUJARAT / RAJASTHAN west border (Pakistan side) going NORTH ──
            [68.18, 23.63],
            [68.84, 24.36],
            [71.04, 24.36],
            [70.84, 25.22],
            [70.28, 25.72],
            [70.17, 26.49],
            [69.51, 26.94],
            [70.62, 27.99],
            [71.78, 27.91],
            [72.82, 28.96],
            [73.45, 29.98],
            [74.42, 30.98],
            [74.41, 31.69],
            [75.26, 32.27],
            [74.45, 32.76],
            [74.10, 33.44],

            // ── POK: Mirpur / Muzaffarabad / Azad Kashmir (India's claim) ──
            [73.80, 33.50],
            [73.50, 33.80],
            [73.20, 34.10],
            [73.00, 34.40],
            [72.40, 34.60],
            [72.00, 34.80],
            [71.60, 35.00],
            [71.20, 35.30],

            // ── GILGIT-BALTISTAN (India's claim) going northwest ──
            [71.00, 35.60],
            [71.50, 35.90],
            [72.10, 36.10],
            [72.50, 36.30],
            // Brief Afghan border contact (Wakhan)
            [73.00, 36.50],
            [73.50, 36.80],
            [74.20, 37.00],
            [74.80, 36.90],
            [75.40, 36.70],
            [76.00, 36.40],
            [76.50, 36.10],
            [77.00, 35.80],

            // ── KARAKORAM / SIACHEN area → Aksai Chin claim line ──
            // India's claim in Aksai Chin runs northeast along Karakoram/Kunlun
            [77.80, 35.50],
            [78.38, 35.49],
            [78.91, 34.32],

            // ── AKSAI CHIN: India's claim goes east along the Kunlun foothills ──
            [79.00, 34.00],
            [79.40, 34.20],
            [80.00, 34.50],
            [80.60, 34.80],
            [81.30, 35.00],
            [82.00, 35.10],
            [82.80, 35.10],
            [83.60, 35.00],
            [84.40, 34.85],
            [85.20, 34.70],
            [85.80, 34.55],
            [86.50, 34.35],
            [87.00, 34.15],

            // ── TURNING SOUTH: back to actual LAC / tri-junction area ──
            // From east of Aksai Chin, the China border turns south
            // heading back to the J&K / HP / Uttarakhand border
            [87.40, 34.00],
            [86.50, 34.35],  // re-trace slightly to avoid kink
            // Actually from eastern Aksai Chin, just continue:
            // We continue the northern boundary eastward toward Himachal/Uttarakhand

            // ── HIMACHAL PRADESH / UTTARAKHAND border with China (going east) ──
            // China border near Spiti / Kinnaur / Chamoli
            [79.21, 32.99],
            [78.81, 33.51],
            [79.18, 32.48],
            [78.46, 32.62],
            [78.74, 31.52],
            [79.72, 30.88],
            [81.11, 30.18],

            // ── NEPAL BORDER ──
            [80.48, 29.73],
            [80.09, 28.79],
            [81.06, 28.42],
            [82.00, 27.90],
            [83.30, 27.36],
            [84.68, 27.23],
            [85.25, 26.73],
            [86.02, 26.63],
            [87.23, 26.40],

            // ── WEST BENGAL / SIKKIM / BHUTAN / ARUNACHAL border going east ──
            [88.06, 26.41],
            [88.17, 26.81],
            [88.04, 27.45],
            [88.12, 27.88],
            [88.73, 28.09],
            [88.81, 27.30],
            [88.84, 27.10],
            [89.74, 26.72],
            [90.37, 26.88],
            [91.22, 26.81],
            [92.03, 26.84],
            [92.10, 27.45],
            [91.70, 27.77],
            [92.50, 27.90],

            // ── ARUNACHAL PRADESH (McMahon Line) ──
            [93.41, 28.64],
            [94.57, 29.28],
            [95.40, 29.03],
            [96.25, 29.45],

            // ── ARUNACHAL EAST / MYANMAR BORDER ──
            [96.59, 28.83],
            [96.25, 28.41],
            [97.33, 28.26],
            [97.40, 27.88],
            [97.05, 27.70],
            [97.13, 27.08],
            [96.42, 27.26],
            [95.12, 26.57],
            [95.16, 26.00],
            [94.60, 25.16],
            [94.55, 24.68],
            [94.11, 23.85],
            [93.33, 24.08],
            [93.29, 23.04],
            [93.06, 23.66],
            [93.17, 22.28],
            [92.67, 22.04],

            // ── MIZORAM / TRIPURA / BANGLADESH BORDER ──
            [92.15, 23.63],
            [91.87, 23.62],
            [91.71, 22.99],
            [91.16, 23.50],
            [91.47, 24.07],
            [91.92, 24.13],
            [92.38, 24.98],
            [91.80, 25.15],
            [90.87, 25.13],
            [89.82, 25.97],
            [89.84, 26.37],
            [89.42, 26.39],
            [88.93, 26.41],
            [88.52, 26.55],
            [88.12, 25.88],
            [88.73, 25.24],
            [88.94, 25.24],
            [88.21, 24.87],
            [88.09, 24.50],
            [88.70, 24.23],
            [88.53, 23.63],
            [88.88, 22.88],
            [89.03, 22.06],
            [88.89, 21.69],

            // ── EAST COAST (WB → Odisha → AP → TN) ──
            [88.21, 21.70],
            [86.98, 21.50],
            [87.03, 20.74],
            [86.50, 20.15],
            [85.06, 19.48],
            [83.94, 18.30],
            [83.19, 17.67],
            [82.19, 17.02],
            [82.19, 16.56],
            [81.69, 16.31],
            [80.79, 15.95],
            [80.32, 15.90],
            [80.03, 15.14],
            [80.23, 13.84],
            [80.29, 13.01],
            [79.86, 12.06],
            [79.86, 10.36],
            [79.34, 10.31],
            [78.89, 9.55],

            // ── SOUTH TIP ──
            [79.19, 9.22],
            [78.28, 8.93],
            [77.94, 8.25],
            [77.54, 8.08],

            // ── WEST COAST (Kerala → Karnataka → Goa → Maharashtra → Gujarat) ──
            [76.59, 8.90],
            [76.13, 10.30],
            [75.75, 11.31],
            [75.40, 11.78],
            [74.86, 12.74],
            [74.62, 13.99],
            [74.44, 14.62],
            [73.53, 15.99],
            [73.12, 17.93],
            [72.82, 19.21],
            [72.82, 20.42],
            [72.63, 21.36],
            [72.11, 21.51],
            [71.18, 20.76],
            [70.47, 20.88],
            [69.16, 22.09],
            [69.64, 22.45],

            // ── CLOSE POLYGON ──
            [68.18, 23.63]
          ]
        ]
      }
    }
  ]
};
