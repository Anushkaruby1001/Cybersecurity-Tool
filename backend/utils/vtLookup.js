import axios from "axios";

export const virusTotalLookup = async (hash) => {
  console.log("VT KEY LOADED:", process.env.VT_API_KEY?.slice(0, 5));

  const url = `https://www.virustotal.com/api/v3/files/${hash}`;

  try {
    const res = await axios.get(url, {
      headers: {
        "x-apikey": process.env.VT_API_KEY,
      },
    });

    const stats = res.data.data.attributes.last_analysis_stats;

    const malicious = stats.malicious || 0;
    const suspicious = stats.suspicious || 0;
    const benign = (stats.harmless || 0) + (stats.undetected || 0);

    let riskLevel = "Low";
    if (malicious > 0) riskLevel = "High";
    else if (suspicious > 0) riskLevel = "Medium";

    return {
      hash,
      malicious,
      suspicious,
      benign,
      riskLevel,
      engine: "VirusTotal",
    };
  } catch (err) {
    console.error("VirusTotal lookup failed:", err.message);

    return {
      hash,
      malicious: 0,
      suspicious: 0,
      benign: 0,
      riskLevel: "Unknown",
      engine: "VirusTotal",
    };
  }
};
