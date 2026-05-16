import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Mock data
  const mentors = [
    {
      id: "m1",
      name: "Alex River",
      role: "Senior Frontend Architect",
      expertise: ["React", "TypeScript", "Tailwind"],
      bio: "10+ years experience building scalable web applications. Specialist in UI architecture.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
      currentLoad: 2,
      maxLoad: 5,
      type: "MENTOR",
      score: 94
    },
    {
      id: "m2",
      name: "Sarah Chen",
      role: "Full Stack Engineer",
      expertise: ["Node.js", "Python", "System Design"],
      bio: "Passionate about backend architecture and AI integration.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      currentLoad: 4,
      maxLoad: 5,
      type: "MENTOR",
      score: 82
    },
    {
      id: "m3",
      name: "Marcus Thorne",
      role: "UX/UI Designer & Dev",
      expertise: ["Framer Motion", "Design Systems", "WebGPU"],
      bio: "Bridging the gap between beautiful design and efficient code.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
      currentLoad: 1,
      maxLoad: 3,
      type: "MENTOR",
      score: 65
    }
  ];

  const companies = [
    { id: "c1", name: "ZenPay Global", stage: "Series A", industry: "Fintech", needs: ["React", "Security"], type: "COMPANY", score: 88 },
    { id: "c2", name: "BioTrack", stage: "Seed", industry: "HealthTech", needs: ["System Design", "Node.js"], type: "COMPANY", score: 74 },
    { id: "c3", name: "CloudCraft", stage: "Pre-seed", industry: "DevTools", needs: ["UX", "Branding"], type: "COMPANY", score: 38 }
  ];

  const partners = [
    { id: "p_1", name: "AWS Startups", type: "PARTNER", expertise: ["Cloud Credits", "Architecture Redviews"], bio: "Providing cloud resources for early stage teams.", score: 99 },
    { id: "p_2", name: "Google for Startups", type: "PARTNER", expertise: ["AI Mastery", "Scaling"], bio: "Accelerating ecosystems through technology.", score: 96 }
  ];

  const serviceProviders = [
    { 
      id: "sp_1", 
      name: "LawLogic", 
      type: "SERVICE_PROVIDER", 
      expertise: ["IP Law", "Compliance"], 
      bio: "Specialized legal services for tech companies.",
      activeWork: [
        { client: "ZenPay Global", task: "Series A Compliance Review", status: "80%" },
        { client: "BioTrack", task: "Patent Filing", status: "25%" }
      ],
      status: "ACTIVE",
      score: 85
    },
    { 
      id: "sp_2", 
      name: "PixelPerfect", 
      type: "SERVICE_PROVIDER", 
      expertise: ["Branding", "UI/UX"], 
      bio: "Premium design services for product-led teams.",
      activeWork: [
        { client: "CloudCraft", task: "Rebranding Phase 1", status: "COMPLETE" }
      ],
      status: "ACTIVE",
      score: 92
    },
    {
      id: "sp_3",
      name: "SecureOps",
      type: "SERVICE_PROVIDER",
      expertise: ["Cybersecurity", "SOC2"],
      bio: "Enterprise-grade security audits.",
      activeWork: [],
      status: "IDLE",
      score: 48
    }
  ];

  const proposals = [
    {
      id: "prop_1",
      name: "Venture Ready Phase 2",
      suggestedMentors: ["m1", "m2"],
      suggestedCompanies: ["c2", "c3"],
      suggestedPartners: ["p_1"],
      suggestedProviders: ["sp_1"],
      logic: "Focusing on deep-tech startups needing Cloud infrastructure (p1) and IP protection (sp1).",
      status: "PENDING"
    }
  ];

  const programs = [
    { id: "pg_1", name: "Global Scaleup 2026", type: "PROGRAMME", status: "ONGOING", startDate: "2026-01-01", description: "For companies expanding to SEA." },
    { id: "pg_2", name: "TechFounders EU", type: "PROGRAMME", status: "REGISTERING", startDate: "2026-07-15", description: "Connecting EU talent with global investors." },
    { id: "pg_3", name: "AI Innovation Lab", type: "PROGRAMME", status: "COMPLETED", startDate: "2025-06-01", description: "Pioneering LLM integration for enterprise." }
  ];

  // Programmable Linkages
  const linkages = [
    { 
      id: "l1", 
      source: "m1", 
      target: "c1", 
      type: "MENTORSHIP", 
      program: "pg_1",
      status: "VERIFIED",
      strength: 85,
      lastInteraction: "2h ago"
    },
    { 
      id: "l2", 
      source: "m2", 
      target: "c2", 
      type: "TECHNICAL_ADVISOR", 
      program: "pg_1",
      status: "ACTIVE",
      strength: 60,
      lastInteraction: "1d ago"
    },
    { 
      id: "l3", 
      source: "p_1", 
      target: "c1", 
      type: "INFRASTRUCTURE_CREDITS", 
      program: "pg_1",
      status: "VERIFIED",
      strength: 100,
      lastInteraction: "Active"
    },
    { 
      id: "l4", 
      source: "sp_1", 
      target: "c1", 
      type: "LEGAL_COMPLIANCE", 
      program: "pg_1",
      status: "ONGOING",
      strength: 45,
      lastInteraction: "3d ago"
    }
  ];

  const resources = [
    { id: "r1", title: "Scaleup Governance Framework", category: "Framework", link: "#", description: "Standardizing ecosystem relationships for global compliance." },
    { id: "r2", title: "Automated Verification Guide", category: "Automation", link: "#", description: "How to programmatically verify program participants." },
    { id: "r3", title: "Linkage JSON Schema", category: "Documentation", link: "#", description: "The technical specification for programmable relationships." }
  ];

  // API Routes
  app.get("/api/mentors", (req, res) => res.json(mentors));
  app.get("/api/resources", (req, res) => res.json(resources));
  app.get("/api/ecosystem", (req, res) => res.json({ mentors, companies, partners, serviceProviders, programs, linkages, proposals }));

  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      const model = "gemini-3-flash-preview";
      
      const response = await ai.models.generateContent({
        model,
        contents: [
          ...history.map((h: any) => ({ role: h.role === 'user' ? 'user' : 'model', parts: [{ text: h.content }] })),
          { role: 'user', parts: [{ text: message }] }
        ],
        config: {
          systemInstruction: "You are ZenPay, a calm and wise mentor for web developers. Your name 'ZenPay' reflects your philosophy: 'Zest, Evolution, Network, and Purposeful Action'. You provide constructive feedback, suggest resources, and help users track their progress. Keep your tone encouraging, minimal, and professional.",
        }
      });

      res.json({ text: response.text });
    } catch (error: any) {
      console.error("Chat error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/agent", async (req, res) => {
    try {
      const { message } = req.body;
      const model = "gemini-3-flash-preview";
      
      const response = await ai.models.generateContent({
        model,
        contents: [{ role: 'user', parts: [{ text: message }] }],
        config: {
          systemInstruction: `You are the ZenBuild Ecosystem Coordinator Agent.
          You manage "Linkages" - programmable relationships between actors (Mentors, Companies, Partners).
          
          Context:
          - Entities: Mentors (Alex, Sarah, Marcus), Companies (ZenPay, BioTrack, CloudCraft), Programs (Global Scaleup).
          - Current Linkages:
            1. Alex (m1) -> ZenPay (c1) [Active Mentor]
            2. Sarah (m2) -> BioTrack (c2) [Technical Advisor]
          
          Your goal is to:
          - Propose new linkages based on entity "Needs" and "Expertise".
          - automate coordination by checking mentor "Load".
          - Explain the logic behind reusable relationship entities.
          - Keep answers concise, high-end, and technical.`,
          tools: [{ googleSearch: {} }]
        }
      });

      res.json({ text: response.text });
    } catch (error: any) {
      console.error("Agent error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
