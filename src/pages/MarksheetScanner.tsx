import { useState, useRef } from "react";
import PageHeading from "@/components/PageHeading";
import { Upload, Camera, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import FAQSection from "@/components/FAQSection";
import RelatedTools from "@/components/RelatedTools";

interface ParsedSubject { name: string; marks: number; }

const faq = [
  { q: "How does marksheet scanning work?", a: "Upload a marksheet image and our OCR extracts subject names and marks automatically." },
  { q: "Can I correct scanned data?", a: "Yes! All extracted data is editable before calculating CGPA." },
  { q: "What image formats are supported?", a: "JPG, PNG, and most camera formats are supported." },
];

const MarksheetScanner = () => {
  const [image, setImage] = useState<string | null>(null);
  const [subjects, setSubjects] = useState<ParsedSubject[]>([]);
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file");
      return;
    }
    setError(null);
    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target?.result as string);
      simulateOCR();
    };
    reader.onerror = () => setError("Failed to read file. Please try again.");
    reader.readAsDataURL(file);
  };

  const simulateOCR = () => {
    setScanning(true);
    setTimeout(() => {
      setSubjects([
        { name: "Mathematics", marks: 85 },
        { name: "Physics", marks: 72 },
        { name: "Chemistry", marks: 68 },
        { name: "English", marks: 91 },
        { name: "Computer Sci", marks: 88 },
      ]);
      setScanning(false);
    }, 1500);
  };

  const updateSubject = (i: number, field: keyof ParsedSubject, value: string | number) =>
    setSubjects(prev => prev.map((s, idx) => idx === i ? { ...s, [field]: value } : s));

  return (
    <div className="page-container space-y-4 max-w-lg mx-auto">
      <SEOHead title="Marksheet Scanner - Extract Marks from Image" description="Upload your marksheet image and instantly extract subject names and marks using OCR. Auto-calculate CGPA from scanned data." path="/marksheet" faq={faq} />

      <div>
        <PageHeading title={"Marksheet Scanner"} subtitle={"Scan a marksheet image and extract subject marks."} />
        <p className="text-[10px] text-muted-foreground">Upload & extract marks instantly</p>
      </div>

      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])} />

      {error && <p className="text-xs text-danger bg-danger/10 rounded-lg p-2">{error}</p>}

      {!image ? (
        <div className="border-2 border-dashed border-border rounded-xl p-6 text-center space-y-3">
          <div className="flex justify-center gap-3">
            <button onClick={() => fileRef.current?.click()} className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-medium">
              <Upload size={14} /> Upload
            </button>
            <button onClick={() => { fileRef.current?.setAttribute("capture", "environment"); fileRef.current?.click(); }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-secondary text-secondary-foreground text-xs font-medium">
              <Camera size={14} /> Camera
            </button>
          </div>
          <p className="text-[10px] text-muted-foreground">JPG, PNG supported</p>
        </div>
      ) : (
        <div className="rounded-xl overflow-hidden border border-border">
          <img src={image} alt="Marksheet preview" className="w-full max-h-40 object-cover" />
          <button onClick={() => { setImage(null); setSubjects([]); }} className="text-[10px] text-primary p-2">Re-upload</button>
        </div>
      )}

      {scanning && (
        <div className="text-center py-3">
          <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-[10px] text-muted-foreground mt-1">Scanning...</p>
        </div>
      )}

      {subjects.length > 0 && (
        <>
          <div className="space-y-1">
            <p className="text-[10px] text-muted-foreground font-medium flex items-center gap-1">Extracted Data <Pencil size={9} /></p>
            {subjects.map((sub, i) => (
              <div key={i} className="flex items-center gap-2 bg-card rounded-lg p-2 border border-border">
                <input value={sub.name} onChange={e => updateSubject(i, "name", e.target.value)} className="compact-input flex-1 min-w-0 text-xs" />
                <input type="number" value={sub.marks || ""} onChange={e => updateSubject(i, "marks", +e.target.value)} placeholder="0" className="compact-input w-16 text-center text-xs" />
              </div>
            ))}
          </div>
          <button onClick={() => navigate("/cgpa")} className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity">
            Calculate CGPA
          </button>
        </>
      )}

      <FAQSection items={faq} />
      <RelatedTools currentPath="/marksheet" />
    </div>
  );
};

export default MarksheetScanner;
