// src/components/PaperDetail.tsx
import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Calendar,
  Users,
  ExternalLink,
  BookOpen,
  TrendingUp,
  FileText,
  Pencil,
  Lightbulb,
  AlertTriangle,
  Sparkles,
  Save,
} from 'lucide-react';
import { Paper } from '../types';

/* ───────────────── helpers ───────────────── */

const trimArr = (arr: string[]) => arr.map((s) => s.trim()).filter(Boolean);

const EditableInline: React.FC<{
  value?: string;
  placeholder: string;
  onSave: (v: string) => void;
}> = ({ value, placeholder, onSave }) => {
  const [editing, setEditing] = useState(false);
  const [tmp, setTmp] = useState(value ?? '');

  const commit = () => {
    onSave(tmp.trim());
    setEditing(false);
  };

  if (editing)
    return (
      <input
        autoFocus
        value={tmp}
        onChange={(e) => setTmp(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => e.key === 'Enter' && commit()}
        className="border border-gray-300 rounded px-1.5 py-0.5 text-sm w-44 focus:ring-1 focus:ring-blue-500"
      />
    );

  return (
    <span className="inline-flex items-center space-x-1">
      {value ? (
        <span>{value}</span>
      ) : (
        <span className="italic text-gray-400">{placeholder}</span>
      )}
      <button
        aria-label="Edit"
        onClick={() => setEditing(true)}
        className="p-0.5 text-gray-500 hover:text-blue-600"
      >
        <Pencil className="h-3 w-3" />
      </button>
    </span>
  );
};

/* ───────────────── PaperDetail ───────────────── */

interface Props {
  paper: Paper;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (p: Paper) => void; // fires ONLY when "Save Changes" is clicked
}

const PaperDetail: React.FC<Props> = ({ paper, isOpen, onClose, onUpdate }) => {
  const [draft, setDraft] = useState<Paper>(paper);
  const original = useRef(JSON.stringify(paper));
  const [dirty, setDirty] = useState(false);

  /* reset draft/dirty each time the modal is opened with a new paper */
  useEffect(() => {
    if (isOpen) {
      setDraft(paper);
      original.current = JSON.stringify(paper);
      setDirty(false);
    }
  }, [isOpen, paper]);

  /* update draft + dirty flag, but DON'T raise onUpdate yet */
  const updateField =
    <K extends keyof Paper>(k: K) =>
    (v: Paper[K]) => {
      const next = { ...draft, [k]: v };
      setDraft(next);
      setDirty(JSON.stringify(next) !== original.current);
    };

  const handleSave = () => {
    onUpdate(draft);
    original.current = JSON.stringify(draft);
    setDirty(false);
  };

  if (!isOpen) return null;

  /* ───────────────── render ───────────────── */

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* ───── Header ───── */}
        <div className="sticky top-0 z-20 bg-white border-b border-gray-200 p-6 flex justify-between">
          <div className="flex-1">
            <EditableInline
              value={draft.title}
              placeholder="Add title"
              onSave={updateField('title')}
            />

            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600 mt-1">
              <InfoBit icon={<Users className="h-4 w-4" />}>
                <EditableInline
                  value={draft.authors?.join(', ')}
                  placeholder="Add authors"
                  onSave={(v) => updateField('authors')(trimArr(v.split(',')))}
                />
              </InfoBit>
              <InfoBit icon={<Calendar className="h-4 w-4" />}>
                <EditableInline
                  value={draft.publishedDate}
                  placeholder="Add date"
                  onSave={updateField('publishedDate')}
                />
              </InfoBit>
              <InfoBit icon={<TrendingUp className="h-4 w-4" />}>
                <EditableInline
                  value={draft.citationCount?.toString()}
                  placeholder="0"
                  onSave={(v) =>
                    updateField('citationCount')(
                      Number(v.replace(/\D/g, '')) || 0
                    )
                  }
                />
                <span className="ml-1">citations</span>
              </InfoBit>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <X className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        {/* ───── Body ───── */}
        <div className="p-6 pt-5 space-y-8">
          {/* BASIC INFO */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <InfoRow icon={<BookOpen className="h-5 w-5 text-blue-600" />} label="Journal:">
                <EditableInline
                  value={draft.journal}
                  placeholder="Add journal"
                  onSave={updateField('journal')}
                />
              </InfoRow>
              <InfoRow icon={<ExternalLink className="h-5 w-5 text-blue-600" />} label="DOI:">
                <EditableInline
                  value={draft.doi}
                  placeholder="Add DOI"
                  onSave={updateField('doi')}
                />
              </InfoRow>
              <InfoRow icon={<FileText className="h-5 w-5 text-blue-600" />} label="Domain:">
                <EditableInline
                  value={draft.domain}
                  placeholder="Add domain"
                  onSave={updateField('domain')}
                />
              </InfoRow>
            </div>

            {/* keywords */}
            <div>
              <span className="font-medium text-gray-900">Keywords:</span>
              {draft.keywords?.length ? (
                <div className="flex flex-wrap gap-2 mt-2">
                  {draft.keywords.map((k) => (
                    <span
                      key={k}
                      className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full"
                    >
                      {k}
                    </span>
                  ))}
                </div>
              ) : (
                <div className="mt-2">
                  <EditableInline
                    value=""
                    placeholder="Add keywords"
                    onSave={(v) =>
                      updateField('keywords')(trimArr(v.split(/[,;]/)))
                    }
                  />
                </div>
              )}
            </div>
          </div>

          {/* ABSTRACT */}
          <Section icon={<FileText className="h-5 w-5 text-blue-600" />} title="Abstract">
            <EditableTextBlock
              value={draft.abstract}
              placeholder="Add abstract"
              onSave={updateField('abstract')}
            />
          </Section>

          {/* FINDINGS */}
          <Section icon={<Lightbulb className="h-5 w-5 text-yellow-500" />} title="Key Findings">
            <EditableBulletList
              items={draft.findings ?? []}
              placeholder="Add key finding"
              onSave={(v) => updateField('findings')(trimArr(v))}
            />
          </Section>

          {/* LIMITATIONS */}
          <Section
            icon={<AlertTriangle className="h-5 w-5 text-red-500" />}
            title="Study Limitations"
          >
            <EditableBulletList
              items={draft.limitations ?? []}
              placeholder="Add limitation"
              onSave={(v) => updateField('limitations')(trimArr(v))}
            />
          </Section>

          {/* REPLICATION */}
          <Section
            icon={<TrendingUp className="h-5 w-5 text-purple-600" />}
            title="Replication Suggestions"
          >
            <EditableBulletList
              items={draft.replicationSuggestions ?? []}
              placeholder="Add suggestion"
              onSave={(v) =>
                updateField('replicationSuggestions')(trimArr(v))
              }
            />
          </Section>

          {/* ─── footer buttons ─── */}
          <div className="flex flex-wrap justify-end gap-4 pt-2">
            <button
              onClick={() => console.log('TODO: Ask AI')}
              className="inline-flex items-center gap-2 px-5 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition"
            >
              <Sparkles className="h-4 w-4" />
              Ask AI
            </button>

            <button
              disabled={!dirty}
              onClick={handleSave}
              className={`inline-flex items-center gap-2 px-5 py-2 rounded-lg transition ${
                dirty
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-gray-300 text-gray-600 cursor-not-allowed'
              }`}
            >
              <Save className="h-4 w-4" />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ───────────────── reusable bits ───────────────── */

const InfoBit: React.FC<{ icon: React.ReactNode }> = ({ icon, children }) => (
  <span className="flex items-center space-x-1">
    {icon}
    {children}
  </span>
);

const InfoRow: React.FC<{ icon: React.ReactNode; label: string }> = ({
  icon,
  label,
  children,
}) => (
  <div className="flex items-center space-x-2">
    {icon}
    <span className="font-medium text-gray-900">{label}</span>
    {children}
  </div>
);

const Section: React.FC<{ icon: React.ReactNode; title: string }> = ({
  icon,
  title,
  children,
}) => (
  <div>
    <div className="flex items-center space-x-2 mb-3">
      {icon}
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
    </div>
    {children}
  </div>
);

const EditableTextBlock: React.FC<{
  value?: string;
  placeholder: string;
  onSave: (v: string) => void;
}> = ({ value, placeholder, onSave }) => {
  const [editing, setEditing] = useState(!value);
  const [tmp, setTmp] = useState(value ?? '');

  const commit = () => {
    onSave(tmp.trim());
    setEditing(false);
  };

  if (editing)
    return (
      <textarea
        autoFocus
        rows={6}
        value={tmp}
        onChange={(e) => setTmp(e.target.value)}
        onBlur={commit}
        className="w-full border border-gray-300 rounded-lg p-2"
      />
    );

  return (
    <div className="relative group">
      <p className="text-gray-700 whitespace-pre-line pr-10">{value}</p>
      <button
        onClick={() => setEditing(true)}
        aria-label="Edit"
        className="absolute top-2 right-2 text-gray-500 opacity-0 group-hover:opacity-100 transition"
      >
        <Pencil className="h-4 w-4" />
      </button>
    </div>
  );
};

/* ───────────────── EditableBulletList ───────────────── */

const EditableBulletList: React.FC<{
  items: string[];
  placeholder: string;
  onSave: (v: string[]) => void;
}> = ({ items, placeholder, onSave }) => {
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [tmp, setTmp] = useState('');

  const startEdit = (idx: number) => {
    setEditIdx(idx);
    setTmp(idx >= 0 ? items[idx] : '');
  };

  const commit = () => {
    const next = [...items];
    if (editIdx === -1) {
      if (tmp.trim()) next.push(tmp.trim());
    } else if (editIdx !== null) {
      next[editIdx] = tmp.trim();
    }
    onSave(next);
    setEditIdx(null);
    setTmp('');
  };

  return (
    <div className="space-y-2">
      <ul>
        {items.map((text, i) => (
          <li key={i} className="flex items-start space-x-2 group">
            <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
            {editIdx === i ? (
              <input
                autoFocus
                value={tmp}
                onChange={(e) => setTmp(e.target.value)}
                onBlur={commit}
                onKeyDown={(e) => e.key === 'Enter' && commit()}
                className="border border-gray-300 rounded px-2 py-1 text-sm w-full"
              />
            ) : (
              <>
                <span className="text-gray-700 flex-1">{text}</span>
                <button
                  aria-label="Edit"
                  onClick={() => startEdit(i)}
                  className="p-0.5 text-gray-500 opacity-0 group-hover:opacity-100"
                >
                  <Pencil className="h-3 w-3" />
                </button>
              </>
            )}
          </li>
        ))}

        {editIdx === -1 && (
          <li className="flex items-start space-x-2">
            <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
            <input
              autoFocus
              value={tmp}
              onChange={(e) => setTmp(e.target.value)}
              onBlur={commit}
              onKeyDown={(e) => e.key === 'Enter' && commit()}
              className="border border-gray-300 rounded px-2 py-1 text-sm w-full"
            />
          </li>
        )}
      </ul>

      {editIdx === null && (
        <button
          onClick={() => startEdit(-1)}
          className="text-blue-600 text-sm inline-flex items-center space-x-1"
        >
          <span>{items.length ? 'Add' : placeholder}</span>
          <Pencil className="h-3 w-3" />
        </button>
      )}
    </div>
  );
};

export default PaperDetail;
