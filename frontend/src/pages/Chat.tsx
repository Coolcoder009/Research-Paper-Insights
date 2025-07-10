
import React, { useState, useRef, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import {
  Send,
  MessageSquare,
  Bot,
  User,
  Paperclip,
  Lightbulb,
  Plus,
  Pencil,
  Check,
  AlertCircle,
} from 'lucide-react';
import { ChatMessage } from '../types';

/* ── helpers ─────────────────────────────────────────────────────────── */

interface ChatTab {
  id: string;
  label: string;
  fromApi: boolean;
  editing?: boolean;
  locked?: boolean;        // ← turns off the pencil icon after 1st msg
}

type Msg = ChatMessage & {
  attachment?: { name: string; url?: string };
};

const WELCOME: Msg = {
  id: 'welcome',
  type: 'assistant',
  content:
    "Hello! I'm your AI research assistant. Ask me anything about your papers.",
  timestamp: new Date(),
};

const fetchApiTitles = async (): Promise<ChatTab[]> => {
  const { data } = await axios.get(
    'http://localhost:8000/api/v1/chatnames/chatnames',
  );
  return (data.response ?? []).map(
    (t: string, i: number): ChatTab => ({
      id: String(i + 1),
      label: t,
      fromApi: true,
    }),
  );
};

/* ── page ────────────────────────────────────────────────────────────── */

const Chat: React.FC = () => {
  /* sidebar */
  const [tabs, setTabs] = useState<ChatTab[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  /* conversation */
  const [msgs, setMsgs] = useState<Msg[]>([WELCOME]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);

  /* naming-modal */
  const [showModal, setShowModal] = useState(false);
  const pending = useRef<() => void>(() => {});

  /* fetch titles */
  useEffect(() => void fetchApiTitles().then(setTabs), []);

  /* scroll chat */
  const logRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: 'smooth' });
  }, [msgs, typing]);

  /* sidebar helpers */
  const newChat = () => {
    const id = `local-${Date.now()}`;
    setTabs((t) => [{ id, label: 'Untitled', fromApi: false }, ...t]);
    setActiveId(id);
    setMsgs([WELCOME]);
  };
  const openTab = (id: string) => {
    setActiveId(id);
    setMsgs([WELCOME]);
  };

  /* rename helpers */
  const toggleEdit = (id: string) =>
    setTabs((t) =>
      t.map((tab) => (tab.id === id ? { ...tab, editing: !tab.editing } : tab)),
    );
  const rename = (id: string, title: string) =>
    setTabs((t) =>
      t.map((tab) =>
        tab.id === id ? { ...tab, label: title.trim() || 'Untitled', editing: false } : tab,
      ),
    );

  /* guard — if active chat is still Untitled and unlocked */
  const needName = () => {
    const tab = tabs.find((t) => t.id === activeId);
    return tab && tab.label === 'Untitled' && !tab.locked;
  };

  /* mark tab locked (no more pencil) */
  const lockTab = () =>
    setTabs((t) =>
      t.map((tab) =>
        tab.id === activeId ? { ...tab, locked: true } : tab,
      ),
    );

  /* SEND TEXT */
  const reallySend = (content: string) => {
    if (!content.trim()) return;
    const user: Msg = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date(),
    };
    setMsgs((m) => [...m, user]);
    setTyping(true);
    setTimeout(() => {
      setMsgs((m) => [
        ...m,
        {
          id: (Date.now() + 1).toString(),
          type: 'assistant',
          content: `“${content}” – (mock reply)`,
          timestamp: new Date(),
        },
      ]);
      setTyping(false);
    }, 1000);
  };

  const send = () => {
    const action = () => {
      lockTab();
      reallySend(input);
      setInput('');
    };
    if (needName()) {
      pending.current = action;
      setShowModal(true);
    } else {
      action();
    }
  };

  /* FILE UPLOAD */
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleFileBtn = () => fileInputRef.current?.click();

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const doUpload = () => {
      lockTab();
      setMsgs((m) => [
        ...m,
        {
          id: Date.now().toString(),
          type: 'user',
          content: '',
          timestamp: new Date(),
          attachment: { name: file.name },
        },
      ]);
      // TODO: real upload
    };

    if (needName()) {
      pending.current = doUpload;
      setShowModal(true);
    } else {
      doUpload();
    }
    e.target.value = '';
  };

  const activeTab = tabs.find((t) => t.id === activeId);

  /* ── UI ────────────────────────────────────────────────────────────── */
  return (
    <>
      {/* ░░ MAIN LAYOUT ░░ */}
      <div className="min-h-screen flex bg-gray-50">
        {/* sidebar */}
        <aside className="w-80 bg-white border-r border-gray-200 flex flex-col h-screen">
          <div className="flex items-center justify-between p-5 border-b">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-blue-600" /> Chats
            </h2>
            <button
              onClick={newChat}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              <Plus className="h-4 w-4 text-gray-600" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-4 pb-6 space-y-3">
            {tabs.map((tab) => (
              <SidebarCard
                key={tab.id}
                tab={tab}
                active={activeId === tab.id}
                onClick={() => openTab(tab.id)}
                onToggleEdit={() => toggleEdit(tab.id)}
                onSave={(title) => rename(tab.id, title)}
              />
            ))}
          </div>
        </aside>

        {/* main */}
        <main className="flex-1 flex flex-col h-screen">
          <header className="bg-white border-b p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-violet-600 rounded-lg">
                <MessageSquare className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold">{activeTab?.label ?? 'AI Assistant'}</h1>
            </div>
            {activeTab?.label === 'Untitled' && !activeTab?.locked && (
              <p className="mt-3 text-sm text-yellow-600">
                Create a chat name to save your chats.
              </p>
            )}
          </header>

          <div ref={logRef} className="flex-1 overflow-y-auto px-6 space-y-6 pb-40">
            {msgs.map((m) =>
              m.attachment ? <AttachmentBubble key={m.id} m={m} /> : <TextBubble key={m.id} m={m} />,
            )}
            {typing && <TypingBubble />}
          </div>

          <div className="sticky bottom-0 bg-white border-t p-6">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && send()}
                  placeholder="Ask about your research papers…"
                  className="w-full px-4 py-3 border rounded-xl pr-12"
                />
                <button
                  onClick={handleFileBtn}
                  className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <Paperclip className="h-5 w-5" />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  hidden
                  onChange={handleFile}
                />
              </div>
              <button
                onClick={send}
                disabled={!input.trim()}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:bg-gray-300 flex items-center gap-2"
              >
                <Send className="h-4 w-4" />
                Send
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* ░░ modal ░░ */}
      {showModal && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white w-full max-w-sm rounded-xl p-6 space-y-4 shadow-lg">
            <div className="flex items-center gap-2 text-yellow-600">
              <AlertCircle className="h-5 w-5" />
              <h2 className="font-semibold">Unsaved chat</h2>
            </div>
            <p className="text-sm text-gray-700">
              This chat is still <strong>Untitled</strong>. If you continue,
              your conversation won’t be saved.
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => {
                  setShowModal(false);
                  // start rename mode
                  toggleEdit(activeId!);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Create chat name
              </button>
              <button
                onClick={() => {
                  setShowModal(false);
                  pending.current();
                }}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

/* ── small components ────────────────────────────────────────────────── */

const SidebarCard: React.FC<{
  tab: ChatTab;
  active: boolean;
  onClick: () => void;
  onToggleEdit: () => void;
  onSave: (t: string) => void;
}> = ({ tab, active, onClick, onToggleEdit, onSave }) => {
  const [draft, setDraft] = useState(tab.label);
  const commit = () => onSave(draft || 'Untitled');

  const editable = !tab.locked;

  return (
    <div
      className={`relative rounded-2xl shadow-sm ${
        active ? 'bg-gradient-to-r from-blue-600 to-violet-600 text-white' : 'bg-gray-50'
      }`}
    >
      {tab.editing ? (
        <>
          <input
            autoFocus
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={commit}
            onKeyDown={(e) => e.key === 'Enter' && commit()}
            className="w-full bg-transparent px-4 py-3 rounded-2xl outline-none"
          />
          <button
            onClick={commit}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-white/20 rounded-full"
          >
            <Check className="h-4 w-4 text-white" />
          </button>
        </>
      ) : (
        <button
          onClick={onClick}
          className="w-full flex items-center gap-3 px-4 py-3 truncate rounded-2xl hover:bg-gray-100/50"
        >
          <MessageSquare
            className={`h-4 w-4 ${active ? 'text-white' : 'text-blue-600'}`}
          />
          <span className="flex-1 truncate">{tab.label}</span>
          {editable && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleEdit();
              }}
              className="p-1 rounded-full hover:bg-white/20"
            >
              <Pencil
                className={`h-3 w-3 ${active ? 'text-white' : 'text-gray-500'}`}
              />
            </button>
          )}
        </button>
      )}
    </div>
  );
};

const Avatar: React.FC<{ who: 'user' | 'assistant' }> = ({ who }) => (
  <div
    className={`w-8 h-8 rounded-full grid place-items-center ${
      who === 'user'
        ? 'bg-blue-600'
        : 'bg-gradient-to-r from-violet-600 to-purple-600'
    }`}
  >
    {who === 'user' ? (
      <User className="h-4 w-4 text-white" />
    ) : (
      <Bot className="h-4 w-4 text-white" />
    )}
  </div>
);

const Timestamp = ({ when, dark }: { when: Date; dark?: boolean }) => (
  <div className={`text-xs mt-2 ${dark ? 'text-blue-100' : 'text-gray-500'}`}>
    {when.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
  </div>
);

const TextBubble: React.FC<{ m: Msg }> = ({ m }) => (
  <div className={`flex ${m.type === 'user' ? 'justify-end' : 'justify-start'}`}>
    <div
      className={`flex max-w-3xl space-x-3 ${
        m.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
      }`}
    >
      <Avatar who={m.type} />
      <div
        className={`p-4 rounded-2xl whitespace-pre-wrap ${
          m.type === 'user' ? 'bg-blue-600 text-white' : 'bg-white border'
        }`}
      >
        {m.content}
        <Timestamp when={m.timestamp} dark={m.type === 'user'} />
      </div>
    </div>
  </div>
);

const AttachmentBubble: React.FC<{ m: Msg }> = ({ m }) => (
  <div className="flex justify-end">
    <div className="flex max-w-3xl flex-row-reverse space-x-reverse space-x-3">
      <Avatar who="user" />
      <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-blue-800">
        📎 {m.attachment?.name}
        <Timestamp when={m.timestamp} />
      </div>
    </div>
  </div>
);

const TypingBubble = () => (
  <div className="flex justify-start">
    <div className="flex space-x-3 max-w-3xl">
      <Avatar who="assistant" />
      <div className="bg-white border rounded-2xl p-4">
        <div className="flex space-x-1">
          {[0, 0.1, 0.2].map((d) => (
            <div
              key={d}
              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
              style={{ animationDelay: `${d}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default Chat;
