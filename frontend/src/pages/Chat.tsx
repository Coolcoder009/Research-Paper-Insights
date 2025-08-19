// import React, { useState, useRef, useEffect, ChangeEvent } from 'react';
// import axios from 'axios';
// import {
//   Send, MessageSquare, Bot, User,
//   Paperclip, Plus, Pencil, Check, AlertCircle,
// } from 'lucide-react';
// import { useSearchParams } from 'react-router-dom';          // ★ NEW
// import { ChatMessage } from '../types';

// /* ── helpers ─────────────────────────────────────────────── */
// const generateUuid = () => crypto.randomUUID();

// /* ── types ──────────────────────────────────────────────── */
// interface ChatTab {
//   id: string;          // sidebar key
//   label: string;       // shown title
//   fromApi: boolean;
//   chatId?: string;     // UUID used by backend
//   editing?: boolean;
//   locked?: boolean;
// }
// type Msg = ChatMessage & { attachment?: { name: string } };

// /* ── constants ───────────────────────────────────────────── */
// const WELCOME: Msg = {
//   id: 'welcome',
//   type: 'assistant',
//   content: "Hello! I'm your AI research assistant. Ask me anything.",
//   timestamp: new Date(),
// };
// const API_TEMP    = 'http://localhost:8000/api/v1/temp_chat';
// const API_CHATBOT = 'http://localhost:8000/api/v1/chat';
// const API_NAMES   = 'http://localhost:8000/api/v1/chatnames/chatnames';
// const API_HISTORY = 'http://localhost:8000/api/v1/prev_chats/previous_chats';

// /* util: transform /previous_chats rows → Msg[] */
// const buildMsgsFromPrev = (rows: any[]): Msg[] =>
//   rows
//     .slice()
//     .reverse()
//     .flatMap((row: any, i: number) => {
//       const t = new Date(row.created_at);
//       const out: Msg[] = [];
//       if (row.file_content) {
//         out.push({
//           id: `${i}-file`,
//           type: 'user',
//           content: `📎 ${row.file_type?.toUpperCase() ?? 'FILE'} attached`,
//           attachment: { name: row.file_name || `upload.${row.file_type ?? 'file'}` },
//           timestamp: t,
//         });
//       }
//       if (row.query) {
//         out.push({ id: `${i}-user`, type: 'user', content: row.query, timestamp: t });
//       }
//       if (row.response) {
//         out.push({ id: `${i}-ai`, type: 'assistant', content: row.response, timestamp: t });
//       }
//       return out;
//     })
//     .filter(Boolean)
//     .concat(rows.length ? [] : [WELCOME]);

// /* ── main component ─────────────────────────────────────── */
// const Chat: React.FC = () => {
//   /* ------- query-string pre-load ------- */
//   const [search] = useSearchParams();
//   const preloadId    = search.get('chatid');
//   const preloadTitle = search.get('title');

//   /* state */
//   const [tabs, setTabs]         = useState<ChatTab[]>([]);
//   const [activeId, setActiveId] = useState<string | null>(preloadId ?? null);
//   const [msgs, setMsgs]         = useState<Msg[]>([WELCOME]);
//   const [input, setInput]       = useState('');
//   const [typing, setTyping]     = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const afterModal = useRef<() => void>(() => {});
//   const logRef    = useRef<HTMLDivElement>(null);
//   const fileInput = useRef<HTMLInputElement>(null);

//   /* ── initial sidebar fetch ─────────────────────────── */
//   useEffect(() => {
//     (async () => {
//       const { data } = await axios.get(API_NAMES);
//       const rows =
//         Array.isArray(data)          ? data :
//         Array.isArray(data.response) ? data.response :
//         Array.isArray(data.data)     ? data.data :
//         [];
//       setTabs(rows.map(
//         (row: { chat_id: string; chatname: string }): ChatTab => ({
//           id: row.chat_id,
//           label: row.chatname,
//           chatId: row.chat_id,
//           fromApi: true,
//           locked: true,
//         }),
//       ));
//     })();
//   }, []);

//   /* ── inject preloaded tab if needed ─────────────────── */
//   useEffect(() => {
//     if (!preloadId) return;
//     setTabs(t =>
//       t.some(tb => tb.id === preloadId)
//         ? t
//         : [
//             {
//               id: preloadId,
//               label: preloadTitle || 'Untitled',
//               fromApi: false,
//               chatId: preloadId,
//               locked: true,
//             },
//             ...t,
//           ]
//     );
//     setMsgs([WELCOME]);
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [preloadId]);

//   /* autoscroll */
//   useEffect(() => {
//     logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: 'smooth' });
//   }, [msgs, typing]);

//   /* helpers */
//   const activeTab  = tabs.find(t => t.id === activeId);
//   const isUntitled = activeTab?.label === 'Untitled';
//   const needName   = () => isUntitled && !activeTab?.locked;
//   const lockTab    = () =>
//     setTabs(x => x.map(t => (t.id === activeId ? { ...t, locked: true } : t)));

//   /* ── file upload ───────────────────────────────────── */
//   const chooseFile = () => fileInput.current?.click();
//   const handleFile = async (e: ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     e.target.value = '';
//     if (!file) return;

//     const sendFile = async () => {
//       lockTab();
//       setMsgs(m => [
//         ...m,
//         {
//           id: Date.now().toString(),
//           type: 'user',
//           content: '',
//           timestamp: new Date(),
//           attachment: { name: file.name },
//         },
//       ]);

//       const fd = new FormData();
//       fd.append('file', file);
//       try {
//         if (isUntitled) {
//           await axios.post(`${API_TEMP}/upload_temp`, fd);
//         } else {
//           await axios.post(`${API_CHATBOT}/upload_chatbot?chat_id=${activeTab!.chatId}`, fd);
//         }
//       } catch (err) {
//         console.error('upload failed', err);
//       }
//     };

//     if (needName()) {
//       afterModal.current = sendFile;
//       setShowModal(true);
//     } else {
//       sendFile();
//     }
//   };

//   /* ── sending text ──────────────────────────────────── */
//   const reallySend = async (text: string) => {
//     if (!text.trim()) return;
//     const userId = Date.now().toString();
//     setMsgs(m => [...m, { id: userId, type: 'user', content: text, timestamp: new Date() }]);
//     setTyping(true);
//     lockTab();

//     try {
//       let assistantText = '';
//       if (isUntitled) {
//         const { data } = await axios.post(`${API_TEMP}/temp_chat`, { query: text });
//         assistantText = data.response;
//       } else {
//         const { data } = await axios.post(
//           `${API_CHATBOT}/chatbot_chat?chat_id=${activeTab!.chatId}`,
//           { query: text },
//         );
//         assistantText = data.response;
//       }
//       setMsgs(m => [
//         ...m,
//         {
//           id: `${userId}-ai`,
//           type: 'assistant',
//           content: assistantText,
//           timestamp: new Date(),
//         },
//       ]);
//     } catch (err) {
//       console.error(err);
//       setMsgs(m => [
//         ...m,
//         {
//           id: `${userId}-err`,
//           type: 'assistant',
//           content: 'Error getting response.',
//           timestamp: new Date(),
//         },
//       ]);
//     } finally {
//       setTyping(false);
//     }
//   };

//   const send = () => {
//     if (needName()) {
//       afterModal.current = () => reallySend(input);
//       setShowModal(true);
//     } else {
//       reallySend(input);
//     }
//     setInput('');
//   };

//   /* ── sidebar actions ──────────────────────────────── */
//   const newChat = () => {
//     const id = `local-${Date.now()}`;
//     setTabs(t => [{ id, label: 'Untitled', fromApi: false }, ...t]);
//     setActiveId(id);
//     setMsgs([WELCOME]);
//   };

//   /** fetch & show history when user picks a chat */
//   const openChat = async (id: string) => {
//     setActiveId(id);
//     setMsgs([WELCOME]);
//     try {
//       const { data } = await axios.get(`${API_HISTORY}?chatid=${id}`);
//       const rows = Array.isArray(data.response) ? data.response : [];
//       setMsgs(buildMsgsFromPrev(rows));
//     } catch (e) {
//       console.error('history load failed', e);
//       setMsgs([WELCOME]);
//     }
//   };

//   const toggleEdit = (id: string) =>
//     setTabs(x => x.map(t => (t.id === id ? { ...t, editing: !t.editing } : t)));

//   const saveName = (id: string, title: string) =>
//     setTabs(x =>
//       x.map(t => {
//         if (t.id !== id) return t;
//         const clean = title.trim() || 'Untitled';
//         const needUuid = clean !== 'Untitled' && !t.chatId;
//         return {
//           ...t,
//           label: clean,
//           chatId: needUuid ? generateUuid() : t.chatId,
//           editing: false,
//         };
//       }),
//     );

//   /* ── JSX ──────────────────────────────────────────── */
//   return (
//     <>
//       <div className="min-h-screen flex bg-gray-50">
//         {/* Sidebar */}
//         <aside className="w-80 border-r flex flex-col bg-white h-screen">
//           <div className="flex items-center justify-between p-5 border-b">
//             <h2 className="text-lg font-semibold flex gap-2">
//               <MessageSquare className="h-5 w-5 text-blue-600" /> Chats
//             </h2>
//             <button onClick={newChat} className="p-2 hover:bg-gray-100 rounded-lg">
//               <Plus className="h-4 w-4 text-gray-600" />
//             </button>
//           </div>
//           <div className="flex-1 overflow-y-auto px-4 pb-6 space-y-3">
//             {tabs.map(t => (
//               <SidebarCard
//                 key={t.id}
//                 tab={t}
//                 active={activeId === t.id}
//                 onClick={() => openChat(t.id)}
//                 onToggleEdit={() => toggleEdit(t.id)}
//                 onSave={n => saveName(t.id, n)}
//               />
//             ))}
//           </div>
//         </aside>

//         {/* Main panel */}
//         <main className="flex-1 flex flex-col h-screen">
//           <header className="border-b bg-white p-6">
//             <div className="flex gap-3 items-center">
//               <div className="p-2 bg-gradient-to-r from-blue-600 to-violet-600 rounded-lg">
//                 <MessageSquare className="h-6 w-6 text-white" />
//               </div>
//               <h1 className="text-2xl font-bold">
//                 {activeTab?.label ?? 'AI Assistant'}
//               </h1>
//             </div>
//             {needName() && (
//               <p className="mt-3 text-sm text-yellow-600">
//                 Create a chat name to save your chats.
//               </p>
//             )}
//           </header>

//           <div ref={logRef} className="flex-1 overflow-y-auto px-6 space-y-6 pb-40">
//             {msgs.map(m =>
//               m.attachment ? (
//                 <AttachmentBubble key={m.id} m={m} />
//               ) : (
//                 <TextBubble key={m.id} m={m} />
//               ),
//             )}
//             {typing && <TypingBubble />}
//           </div>

//           {/* input bar */}
//           <div className="sticky bottom-0 bg-white border-t p-6">
//             <div className="flex gap-4">
//               <div className="relative flex-1">
//                 <input
//                   value={input}
//                   onChange={e => setInput(e.target.value)}
//                   onKeyDown={e => e.key === 'Enter' && send()}
//                   placeholder="Ask something…"
//                   className="w-full border rounded-xl px-4 py-3 pr-12"
//                 />
//                 <button
//                   onClick={chooseFile}
//                   className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                 >
//                   <Paperclip className="h-5 w-5" />
//                 </button>
//                 <input
//                   ref={fileInput}
//                   hidden
//                   type="file"
//                   accept=".pdf,.doc,.docx"
//                   onChange={handleFile}
//                 />
//               </div>
//               <button
//                 onClick={send}
//                 disabled={!input.trim()}
//                 className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:bg-gray-300 flex gap-2"
//               >
//                 <Send className="h-4 w-4" /> Send
//               </button>
//             </div>
//           </div>
//         </main>
//       </div>

//       {showModal && (
//         <Modal
//           onCreate={() => {
//             setShowModal(false);
//             toggleEdit(activeId!);
//           }}
//           onContinue={() => {
//             setShowModal(false);
//             afterModal.current();
//           }}
//         />
//       )}
//     </>
//   );
// };

// /* ========== tiny presentational helpers (unchanged except AttachmentBubble) ===== */

// const Avatar = ({who}:{who:'user'|'assistant'})=>(
//   <div className={`w-8 h-8 rounded-full grid place-items-center ${
//     who==='user'?'bg-blue-600':'bg-gradient-to-r from-violet-600 to-purple-600'
//   }`}>
//     {who==='user'?<User className="h-4 w-4 text-white"/>:<Bot className="h-4 w-4 text-white"/>}
//   </div>
// );
// const Stamp=({when,dark}:{when:Date;dark?:boolean})=>(
//   <div className={`text-xs mt-2 ${dark?'text-blue-100':'text-gray-500'}`}>
//     {when.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})}
//   </div>
// );

// const TextBubble:React.FC<{m:Msg}> = ({m})=>(
//   <div className={`flex ${m.type==='user'?'justify-end':'justify-start'}`}>
//     <div className={`flex max-w-3xl space-x-3 ${
//         m.type==='user'?'flex-row-reverse space-x-reverse':''}`}>
//       <Avatar who={m.type}/>
//       <div className={`p-4 rounded-2xl whitespace-pre-wrap ${
//         m.type==='user'?'bg-blue-600 text-white':'bg-white border'}`}>
//         {m.content}
//         <Stamp when={m.timestamp} dark={m.type==='user'}/>
//       </div>
//     </div>
//   </div>
// );

// /* >>> file bubble with click-to-open <<< */
// const AttachmentBubble:React.FC<{m:Msg}> = ({m})=>{
//   const open = ()=>{
//     if(!m.attachment?.data) return;
//     const url=atobUrl(m.attachment.data, m.attachment.mime||'application/octet-stream');
//     window.open(url,'_blank','noopener');
//   };
//   return(
//     <div className="flex justify-end">
//       <button onClick={open} className="flex max-w-3xl flex-row-reverse space-x-reverse space-x-3 group">
//         <Avatar who="user"/>
//         <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl text-blue-800 underline-offset-2 group-hover:underline">
//           📎 {m.attachment?.name}
//           <Stamp when={m.timestamp}/>
//         </div>
//       </button>
//     </div>
//   );
// };

// const TypingBubble=()=>(
//   <div className="flex justify-start">
//     <div className="flex max-w-3xl space-x-3">
//       <Avatar who="assistant"/>
//       <div className="bg-white border rounded-2xl p-4">
//         <div className="flex space-x-1">
//           {[0,0.1,0.2].map(d=>(
//             <div key={d} className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
//                  style={{animationDelay:`${d}s`}}/>
//           ))}
//         </div>
//       </div>
//     </div>
//   </div>
// );

// /* SidebarCard & Modal unchanged from your snippet */
// const SidebarCard:React.FC<{
//   tab:ChatTab;active:boolean;onClick:()=>void;
//   onToggleEdit:()=>void;onSave:(v:string)=>void;
// }> = ({tab,active,onClick,onToggleEdit,onSave})=>{
//   const [draft,setDraft]=useState(tab.label);
//   const commit=()=>onSave(draft.trim());
//   return(
//     <div className={`relative rounded-2xl shadow-sm ${
//       active?'bg-gradient-to-r from-blue-600 to-violet-600 text-white':'bg-gray-50'}`}>
//       {tab.editing?(
//         <>
//           <input autoFocus value={draft} onChange={e=>setDraft(e.target.value)}
//                  onBlur={commit} onKeyDown={e=>e.key==='Enter'&&commit()}
//                  className="w-full bg-transparent px-4 py-3 rounded-2xl outline-none"/>
//           <button onClick={commit}
//             className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-white/20 rounded-full">
//             <Check className="h-4 w-4 text-white"/>
//           </button>
//         </>
//       ):(
//         <button onClick={onClick}
//           className="w-full flex items-center gap-3 px-4 py-3 truncate rounded-2xl hover:bg-gray-100/50">
//           <MessageSquare className={`h-4 w-4 ${active?'text-white':'text-blue-600'}`}/>
//           <span className="flex-1 truncate">{tab.label}</span>
//           {!tab.locked&&(
//             <button onClick={e=>{e.stopPropagation();onToggleEdit();}}
//               className="p-1 rounded-full hover:bg-white/20">
//               <Pencil className={`h-3 w-3 ${active?'text-white':'text-gray-500'}`}/>
//             </button>
//           )}
//         </button>
//       )}
//     </div>
//   );
// };

// const Modal: React.FC<{ onCreate: () => void; onContinue: () => void }> = ({
//   onCreate, onContinue,
// }) => (
//   <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 backdrop-blur-sm">
//     <div className="bg-white w-full max-w-sm rounded-xl p-6 space-y-4 shadow-lg">
//       <div className="flex items-center gap-2 text-yellow-600">
//         <AlertCircle className="h-5 w-5" />
//         <h2 className="font-semibold">Unsaved chat</h2>
//       </div>
//       <p className="text-sm text-gray-700">
//         This chat is still <strong>Untitled</strong>. If you continue, the conversation won’t be saved.
//       </p>
//       <div className="flex justify-end gap-3 pt-2">
//         <button
//           onClick={onCreate}
//           className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//         >
//           Create chat name
//         </button>
//         <button
//           onClick={onContinue}
//           className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
//         >
//           Continue
//         </button>
//       </div>
//     </div>
//   </div>
// );

// export default Chat;
// src/components/Chat.tsx
import React, { useState, useRef, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import {
  Send, MessageSquare, Bot, User, Paperclip, Plus, Pencil,
  Check, AlertCircle,
} from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { ChatMessage } from '../types';

/* ── helpers ─────────────────────────────────────────────── */
const generateUuid = () => crypto.randomUUID();
const mimeMap: Record<string, string> = {
  pdf:  'application/pdf',
  doc:  'application/msword',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
};
/** build a `data:` URL from base-64 */
const b64Url = (b64: string, mime: string) => `data:${mime};base64,${b64}`;

/* ── types ──────────────────────────────────────────────── */
interface ChatTab {
  id: string;
  label: string;
  fromApi: boolean;
  chatId?: string;
  editing?: boolean;
  locked?: boolean;
}
type Msg = ChatMessage & {
  /** optional attachment (history or freshly uploaded) */
  attachment?: {
    name: string;
    /** for previously-saved uploads */
    data?: string;
    mime?: string;
    /** for freshly-uploaded local files */
    url?: string;
  };
};

/* ── constants ───────────────────────────────────────────── */
const WELCOME: Msg = {
  id: 'welcome',
  type: 'assistant',
  content: "Hello! I'm your AI research assistant. Ask me anything.",
  timestamp: new Date(),
};
const API_TEMP    = 'http://localhost:8000/api/v1/temp_chat';
const API_CHATBOT = 'http://localhost:8000/api/v1/chat';
const API_NAMES   = 'http://localhost:8000/api/v1/chatnames/chatnames';
const API_HISTORY = 'http://localhost:8000/api/v1/prev_chats/previous_chats';

/* util: transform /previous_chats rows → Msg[] */
const buildMsgsFromPrev = (rows: any[]): Msg[] =>
  rows
    .slice()
    .reverse()
    .flatMap((row: any, i: number) => {
      const t = new Date(row.created_at);
      const out: Msg[] = [];
      if (row.file_content) {
        out.push({
          id: `${i}-file`,
          type: 'user',
          content: `📎 ${row.file_type?.toUpperCase() ?? 'FILE'} attached`,
          attachment: {
            name: row.file_name || `upload.${row.file_type ?? 'file'}`,
            data: row.file_content,
            mime: mimeMap[row.file_type] ?? 'application/octet-stream',
          },
          timestamp: t,
        });
      }
      if (row.query) {
        out.push({ id: `${i}-user`, type: 'user', content: row.query, timestamp: t });
      }
      if (row.response) {
        out.push({ id: `${i}-ai`, type: 'assistant', content: row.response, timestamp: t });
      }
      return out;
    })
    .filter(Boolean)
    .concat(rows.length ? [] : [WELCOME]);

/* ── component ───────────────────────────────────────────── */
const Chat: React.FC = () => {
  /* query-string preload */
  const [search] = useSearchParams();
  const preloadId    = search.get('chatid')  || null;
  const preloadTitle = search.get('title')   || undefined;

  /* state */
  const [tabs, setTabs]         = useState<ChatTab[]>([]);
  const [activeId, setActiveId] = useState<string | null>(preloadId);
  const [msgs, setMsgs]         = useState<Msg[]>([WELCOME]);
  const [input, setInput]       = useState('');
  const [typing, setTyping]     = useState(false);
  const [showModal, setShowModal] = useState(false);
  const afterModal = useRef<() => void>(() => {});

  const logRef    = useRef<HTMLDivElement>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  /* ── fetch chat-names + inject preloaded tab (FIX) ─────── */
  useEffect(() => {
    (async () => {
      /* 1. fetch server list */
      const { data } = await axios.get(API_NAMES);
      const rows =
        Array.isArray(data)          ? data :
        Array.isArray(data.response) ? data.response :
        Array.isArray(data.data)     ? data.data :
        [];

      let next: ChatTab[] = rows.map(
        (r: { chat_id: string; chatname: string }): ChatTab => ({
          id: r.chat_id,
          label: r.chatname,
          chatId: r.chat_id,
          fromApi: true,
          locked: true,
        }),
      );

      /* 2. add tab from query-string if missing */
      if (preloadId) {
        if (!next.some(t => t.id === preloadId)) {
          next = [
            {
              id: preloadId,
              label: preloadTitle || 'Untitled',
              fromApi: false,
              chatId: preloadId,
              locked: true,
            },
            ...next,
          ];
        }
        setActiveId(preloadId);        // make sure it’s selected
      }

      setTabs(next);
    })();
  }, [preloadId, preloadTitle]);

  /* autoscroll */
  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: 'smooth' });
  }, [msgs, typing]);

  /* helpers */
  const activeTab  = tabs.find(t => t.id === activeId);
  const isUntitled = activeTab?.label === 'Untitled';
  const needName   = () => isUntitled && !activeTab?.locked;
  const lockTab    = () =>
    setTabs(x => x.map(t => (t.id === activeId ? { ...t, locked: true } : t)));

  /* ── file upload ─────────────────────────────────────── */
  const chooseFile = () => fileInput.current?.click();
/* ── file upload ─────────────────────────────────────── */
const handleFile = async (e: ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  e.target.value = '';
  if (!file) return;

  // optimistic bubble
  const localUrl = URL.createObjectURL(file);
  setMsgs(m => [
    ...m,
    {
      id: Date.now().toString(),
      type: 'user',
      content: '',
      timestamp: new Date(),
      attachment: { name: file.name, url: localUrl },
    },
  ]);

  const fd = new FormData();
  fd.append('file', file);

  try {
    lockTab();
    if (isUntitled) {
      await axios.post(`${API_TEMP}/upload_temp`, fd);
    } else {
      const qs = new URLSearchParams({
        chatid: activeTab!.chatId!,
        chatname: activeTab!.label,
      }).toString();
      await axios.post(`${API_CHATBOT}/upload_chatbot?${qs}`, fd);
    }
  } catch (err) {
    console.error('upload failed', err);
  }
};

/* ── send text ────────────────────────────────────────── */
const reallySend = async (text: string) => {
  if (!text.trim()) return;

  const userId = Date.now().toString();
  setMsgs(m => [
    ...m,
    { id: userId, type: 'user', content: text, timestamp: new Date() },
  ]);
  setTyping(true);
  lockTab();

  try {
    let assistantText = '';
    if (isUntitled) {
      const { data } = await axios.post(`${API_TEMP}/temp_chat`, { query: text });
      assistantText = data.response;
    } else {
      const qs = new URLSearchParams({
        chatid: activeTab!.chatId!,
        chatname: activeTab!.label,
      }).toString();
      const { data } = await axios.post(
        `${API_CHATBOT}/chatbot_chat?${qs}`,
        { query: text },
      );
      assistantText = data.response;
    }

    setMsgs(m => [
      ...m,
      {
        id: `${userId}-ai`,
        type: 'assistant',
        content: assistantText,
        timestamp: new Date(),
      },
    ]);
  } catch (err) {
    console.error(err);
    setMsgs(m => [
      ...m,
      {
        id: `${userId}-err`,
        type: 'assistant',
        content: 'Error getting response.',
        timestamp: new Date(),
      },
    ]);
  } finally {
    setTyping(false);
  }
};

  const send = () => {
    if (needName()) {
      afterModal.current = () => reallySend(input);
      setShowModal(true);
    } else {
      reallySend(input);
    }
    setInput('');
  };

  /* ── sidebar actions ─────────────────────────────────── */
  const newChat = () => {
    const id = `local-${Date.now()}`;
    setTabs(t => [{ id, label: 'Untitled', fromApi: false }, ...t]);
    setActiveId(id);
    setMsgs([WELCOME]);
  };
  const openChat = async (id: string) => {
    setActiveId(id);
    setMsgs([WELCOME]);
    try {
      const { data } = await axios.get(`${API_HISTORY}?chatid=${id}`);
      const rows = Array.isArray(data.response) ? data.response : [];
      setMsgs(buildMsgsFromPrev(rows));
    } catch (e) {
      console.error('history load failed', e);
      setMsgs([WELCOME]);
    }
  };
  const toggleEdit = (id: string) =>
    setTabs(x => x.map(t => (t.id === id ? { ...t, editing: !t.editing } : t)));
  const saveName = (id: string, title: string) =>
    setTabs(x =>
      x.map(t => {
        if (t.id !== id) return t;
        const clean = title.trim() || 'Untitled';
        const needUuid = clean !== 'Untitled' && !t.chatId;
        return {
          ...t,
          label: clean,
          chatId: needUuid ? generateUuid() : t.chatId,
          editing: false,
        };
      }),
    );

  /* ── render ──────────────────────────────────────────── */
  return (
    <>
      <div className="min-h-screen flex bg-gray-50">
        {/* === Sidebar === */}
        <aside className="w-80 border-r flex flex-col bg-white h-screen">
          <div className="flex items-center justify-between p-5 border-b">
            <h2 className="text-lg font-semibold flex gap-2">
              <MessageSquare className="h-5 w-5 text-blue-600" /> Chats
            </h2>
            <button onClick={newChat} className="p-2 hover:bg-gray-100 rounded-lg">
              <Plus className="h-4 w-4 text-gray-600" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-4 pb-6 space-y-3">
            {tabs.map(t => (
              <SidebarCard
                key={t.id}
                tab={t}
                active={activeId === t.id}
                onClick={() => openChat(t.id)}
                onToggleEdit={() => toggleEdit(t.id)}
                onSave={n => saveName(t.id, n)}
              />
            ))}
          </div>
        </aside>

        {/* === Main === */}
        <main className="flex-1 flex flex-col h-screen">
          <header className="border-b bg-white p-6">
            <div className="flex gap-3 items-center">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-violet-600 rounded-lg">
                <MessageSquare className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold">
                {activeTab?.label ?? 'AI Assistant'}
              </h1>
            </div>
            {needName() && (
              <p className="mt-3 text-sm text-yellow-600">
                Create a chat name to save your chats.
              </p>
            )}
          </header>

          {/* chat log */}
          <div ref={logRef} className="flex-1 overflow-y-auto px-6 space-y-6 pb-40">
            {msgs.map(m =>
              m.attachment ? (
                <AttachmentBubble key={m.id} m={m} />
              ) : (
                <TextBubble key={m.id} m={m} />
              ),
            )}
            {typing && <TypingBubble />}
          </div>

          {/* compose bar */}
          <div className="sticky bottom-0 bg-white border-t p-6">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <input
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && send()}
                  placeholder="Ask something…"
                  className="w-full border rounded-xl px-4 py-3 pr-12"
                />
                <button
                  onClick={chooseFile}
                  className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <Paperclip className="h-5 w-5" />
                </button>
                <input
                  ref={fileInput}
                  hidden
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFile}
                />
              </div>
              <button
                onClick={send}
                disabled={!input.trim()}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:bg-gray-300 flex gap-2"
              >
                <Send className="h-4 w-4" /> Send
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* ===== Unsaved-chat modal ===== */}
      {showModal && (
        <Modal
          onCreate={() => {
            setShowModal(false);
            toggleEdit(activeId!);
          }}
          onContinue={() => {
            setShowModal(false);
            afterModal.current();
          }}
        />
      )}
    </>
  );
};

/* ───────────────── presentation bits (unchanged except AttachmentBubble) ───────────── */

const Avatar = ({ who }: { who: 'user' | 'assistant' }) => (
  <div
    className={`w-8 h-8 rounded-full grid place-items-center ${
      who === 'user'
        ? 'bg-blue-600'
        : 'bg-gradient-to-r from-violet-600 to-purple-600'
    }`}
  >
    {who === 'user'
      ? <User className="h-4 w-4 text-white" />
      : <Bot  className="h-4 w-4 text-white" />}
  </div>
);
const Stamp = ({ when, dark }: { when: Date; dark?: boolean }) => (
  <div className={`text-xs mt-2 ${dark ? 'text-blue-100' : 'text-gray-500'}`}>
    {when.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
  </div>
);

const TextBubble: React.FC<{ m: Msg }> = ({ m }) => (
  <div className={`flex ${m.type === 'user' ? 'justify-end' : 'justify-start'}`}>
    <div className={`flex max-w-3xl space-x-3 ${
      m.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
      <Avatar who={m.type} />
      <div
        className={`p-4 rounded-2xl whitespace-pre-wrap ${
          m.type === 'user' ? 'bg-blue-600 text-white' : 'bg-white border'}`}
      >
        {m.content}
        <Stamp when={m.timestamp} dark={m.type === 'user'} />
      </div>
    </div>
  </div>
);

/* click-to-open attachment bubble */
const AttachmentBubble: React.FC<{ m: Msg }> = ({ m }) => {
  const open = () => {
    if (m.attachment?.url) {
      window.open(m.attachment.url, '_blank', 'noopener');
    } else if (m.attachment?.data && m.attachment?.mime) {
      window.open(b64Url(m.attachment.data, m.attachment.mime), '_blank', 'noopener');
    }
  };
  return (
    <div className="flex justify-end">
      <button
        onClick={open}
        className="flex max-w-3xl flex-row-reverse space-x-reverse space-x-3 group"
      >
        <Avatar who="user" />
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl text-blue-800 underline-offset-2 group-hover:underline">
          📎 {m.attachment?.name}
          <Stamp when={m.timestamp} />
        </div>
      </button>
    </div>
  );
};

const TypingBubble = () => (
  <div className="flex justify-start">
    <div className="flex max-w-3xl space-x-3">
      <Avatar who="assistant" />
      <div className="bg-white border rounded-2xl p-4">
        <div className="flex space-x-1">
          {[0, 0.1, 0.2].map(d => (
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

const SidebarCard: React.FC<{
  tab: ChatTab; active: boolean; onClick: () => void;
  onToggleEdit: () => void; onSave: (v: string) => void;
}> = ({ tab, active, onClick, onToggleEdit, onSave }) => {
  const [draft, setDraft] = useState(tab.label);
  const commit = () => onSave(draft.trim());

  return (
    <div
      className={`relative rounded-2xl shadow-sm ${
        active
          ? 'bg-gradient-to-r from-blue-600 to-violet-600 text-white'
          : 'bg-gray-50'
      }`}
    >
      {tab.editing ? (
        <>
          <input
            autoFocus
            value={draft}
            onChange={e => setDraft(e.target.value)}
            onBlur={commit}
            onKeyDown={e => e.key === 'Enter' && commit()}
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
            className={`h-4 w-4 ${
              active ? 'text-white' : 'text-blue-600'
            } flex-shrink-0`}
          />
          <span className="flex-1 truncate">{tab.label}</span>
          {!tab.locked && (
            <button
              onClick={e => {
                e.stopPropagation();
                onToggleEdit();
              }}
              className="p-1 rounded-full hover:bg-white/20"
            >
              <Pencil className={`h-3 w-3 ${active ? 'text-white' : 'text-gray-500'}`} />
            </button>
          )}
        </button>
      )}
    </div>
  );
};

const Modal: React.FC<{ onCreate: () => void; onContinue: () => void }> = ({
  onCreate, onContinue,
}) => (
  <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 backdrop-blur-sm">
    <div className="bg-white w-full max-w-sm rounded-xl p-6 space-y-4 shadow-lg">
      <div className="flex items-center gap-2 text-yellow-600">
        <AlertCircle className="h-5 w-5" />
        <h2 className="font-semibold">Unsaved chat</h2>
      </div>
      <p className="text-sm text-gray-700">
        This chat is still <strong>Untitled</strong>. If you continue, the conversation won’t be
        saved.
      </p>
      <div className="flex justify-end gap-3 pt-2">
        <button
          onClick={onCreate}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Create chat name
        </button>
        <button
          onClick={onContinue}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
        >
          Continue
        </button>
      </div>
    </div>
  </div>
);

export default Chat;
