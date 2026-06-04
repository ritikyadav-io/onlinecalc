import { useState, useRef } from "react";
import PageHeading from "@/components/PageHeading";
import { motion } from "framer-motion";
import { Upload, FileText, Search, Languages, ListChecks, Lightbulb } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import RelatedTools from "@/components/RelatedTools";
import RelatedCategory from "@/components/RelatedCategory";
import { supabase } from "@/integrations/supabase/client";

const DocumentReader = () => {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [keyPoints, setKeyPoints] = useState<string[]>([]);
  const [actions, setActions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [askingQ, setAskingQ] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError("");
    setSummary("");
    setKeyPoints([]);
    setActions([]);
    setAnswer("");

    // For text files, read directly
    if (file.type === "text/plain" || file.name.endsWith(".txt") || file.name.endsWith(".md")) {
      const content = await file.text();
      setText(content);
      analyzeText(content);
      return;
    }

    // For images, show a message
    if (file.type.startsWith("image/")) {
      setError("Image OCR requires backend setup. For now, please paste the text manually or upload a text file.");
      return;
    }

    setError("Please upload a .txt or .md file. PDF and image OCR support coming soon.");
  };

  const analyzeText = async (content: string) => {
    if (!content.trim()) return;
    setLoading(true);
    try {
      const { data, error: fnError } = await supabase.functions.invoke("analyze-document", {
        body: { text: content.slice(0, 5000), action: "analyze" },
      });
      if (fnError) throw fnError;
      setSummary(data?.summary || "Could not generate summary.");
      setKeyPoints(data?.keyPoints || []);
      setActions(data?.actions || []);
    } catch (err) {
      // Fallback: simple local analysis
      const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 10);
      setSummary(sentences.slice(0, 3).join(". ") + ".");
      setKeyPoints(sentences.slice(0, 5).map(s => s.trim()));
      setActions(["Review the document carefully", "Note any deadlines mentioned", "Follow up on action items"]);
    } finally {
      setLoading(false);
    }
  };

  const askQuestion = async () => {
    if (!question.trim() || !text.trim()) return;
    setAskingQ(true);
    try {
      const { data, error: fnError } = await supabase.functions.invoke("analyze-document", {
        body: { text: text.slice(0, 5000), action: "question", question },
      });
      if (fnError) throw fnError;
      setAnswer(data?.answer || "Could not find an answer.");
    } catch {
      // Simple keyword search fallback
      const lowerQ = question.toLowerCase();
      const relevant = text.split(/[.!?]+/).filter(s => s.toLowerCase().includes(lowerQ.split(" ")[0]));
      setAnswer(relevant.length > 0 ? relevant.slice(0, 2).join(". ") + "." : "Could not find a relevant answer. Try rephrasing your question.");
    } finally {
      setAskingQ(false);
    }
  };

  const hasResult = summary || keyPoints.length > 0;

  return (
    <div className="page-container max-w-2xl mx-auto space-y-5 animate-fade-up">
      <SEOHead title="Document Reader - Smart Assistant" description="Upload documents, get summaries, key points, and ask questions about your content." path="/doc-reader" />

      <div>
        <PageHeading title={"Document Reader"} subtitle={"Upload a document or paste text to get smart analysis."} />
        </div>

      {/* Upload */}
      <div className="guide-card space-y-4">
        <div
          onClick={() => fileRef.current?.click()}
          className="border-2 border-dashed border-border rounded-2xl p-8 text-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all">
          <Upload size={32} className="mx-auto text-muted-foreground mb-3" />
          <p className="text-[15px] font-bold text-foreground">Upload File</p>
          <p className="text-[13px] text-muted-foreground mt-1">Supports .txt, .md files</p>
          <input ref={fileRef} type="file" accept=".txt,.md,.text" onChange={handleFile} className="hidden" />
        </div>

        <div className="text-center text-[13px] font-semibold text-muted-foreground">— OR —</div>

        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Paste your text here..."
          className="compact-input w-full min-h-[120px] resize-y"
          rows={5}
        />

        {text && !hasResult && (
          <button onClick={() => analyzeText(text)}
            className="w-full py-3 rounded-xl bg-primary text-primary-foreground text-[15px] font-bold hover:bg-primary/90 transition-all">
            Analyze Text
          </button>
        )}

        {error && <p className="text-[14px] text-danger font-semibold text-center">{error}</p>}
      </div>

      {loading && (
        <div className="text-center py-8">
          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-[14px] text-muted-foreground mt-3">Analyzing document...</p>
        </div>
      )}

      {hasResult && !loading && (
        <>
          {/* Summary */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="guide-card">
            <p className="text-[16px] font-bold text-foreground flex items-center gap-2">
              <FileText size={18} className="text-primary" /> 📄 Summary
            </p>
            <p className="text-[15px] text-muted-foreground mt-2 leading-relaxed">{summary}</p>
          </motion.div>

          {/* Key Points */}
          {keyPoints.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="guide-card">
              <p className="text-[16px] font-bold text-foreground flex items-center gap-2">
                <Lightbulb size={18} className="text-warning" /> 🎯 Key Points
              </p>
              <div className="space-y-2 mt-3">
                {keyPoints.map((p, i) => (
                  <p key={i} className="text-[14px] text-muted-foreground flex items-start gap-2">
                    <span className="text-primary font-bold mt-0.5">•</span> {p}
                  </p>
                ))}
              </div>
            </motion.div>
          )}

          {/* Actions */}
          {actions.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="guide-card">
              <p className="text-[16px] font-bold text-foreground flex items-center gap-2">
                <ListChecks size={18} className="text-safe" /> ⚠️ Important Actions
              </p>
              <div className="space-y-2 mt-3">
                {actions.map((a, i) => (
                  <p key={i} className="text-[14px] text-muted-foreground flex items-start gap-2">
                    <span className="text-safe font-bold mt-0.5">→</span> {a}
                  </p>
                ))}
              </div>
            </motion.div>
          )}

          {/* Ask Questions */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="guide-card space-y-3">
            <p className="text-[16px] font-bold text-foreground flex items-center gap-2">
              <Search size={18} className="text-primary" /> ❓ Ask a Question
            </p>
            <div className="flex gap-2">
              <input
                value={question}
                onChange={e => setQuestion(e.target.value)}
                onKeyDown={e => e.key === "Enter" && askQuestion()}
                placeholder="What is the deadline?"
                className="compact-input flex-1"
              />
              <button onClick={askQuestion} disabled={askingQ}
                className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-[14px] font-bold hover:bg-primary/90 transition-all disabled:opacity-50">
                {askingQ ? "..." : "Ask"}
              </button>
            </div>
            {answer && (
              <div className="bg-secondary/50 rounded-xl p-4">
                <p className="text-[14px] text-foreground leading-relaxed">{answer}</p>
              </div>
            )}
          </motion.div>

          {/* Re-analyze */}
          <div className="flex gap-2">
            <button onClick={() => analyzeText(text)}
              className="flex-1 py-2.5 rounded-xl bg-secondary text-foreground text-[14px] font-bold hover:bg-secondary/80 transition-all">
              🔄 Re-analyze
            </button>
            <button onClick={() => { setText(""); setSummary(""); setKeyPoints([]); setActions([]); setAnswer(""); }}
              className="flex-1 py-2.5 rounded-xl bg-secondary text-foreground text-[14px] font-bold hover:bg-secondary/80 transition-all">
              🗑️ Clear
            </button>
          </div>
        </>
      )}

      {!text && !loading && (
        <div className="text-center py-12">
          <p className="text-[40px] mb-3">📄</p>
          <p className="text-[16px] font-semibold text-foreground">Upload a file or paste text</p>
          <p className="text-[14px] text-muted-foreground mt-1">Get summary, key points, and ask questions</p>
        </div>
      )}


      <RelatedTools currentPath="/doc-reader" />
      <RelatedCategory cluster="study" />
    </div>
  );
};

export default DocumentReader;
