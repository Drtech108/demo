// src/pages/AdminMessages.tsx
import { useEffect, useState } from "react";
import {
  collection,
  query,
  onSnapshot,
  doc,
  deleteDoc,
  FirestoreError,
  Timestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import { motion, AnimatePresence } from "framer-motion";

type MsgItem = {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  createdAt: Date | null;
};

type FirestoreMsg = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  createdAt?: Timestamp | { seconds: number };
};

export default function AdminMessages(): React.ReactElement {
  const [messages, setMessages] = useState<MsgItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);

    // keep query simple (no orderBy yet)
    const q = query(collection(db, "messages"));

    const unsub = onSnapshot(
      q,
      (snapshot) => {
        console.log("📥 Snapshot received, size:", snapshot.size);

        const docs: MsgItem[] = snapshot.docs.map((d) => {
          const data = d.data() as FirestoreMsg;
          console.log("🔹 Doc data:", d.id, data);

          let created: Date | null = null;
          if (data?.createdAt instanceof Timestamp) {
            created = data.createdAt.toDate();
          } else if (data?.createdAt && "seconds" in data.createdAt) {
            created = new Date(data.createdAt.seconds * 1000);
          }

          return {
            id: d.id,
            name: data.name ?? "",
            email: data.email ?? "",
            subject: data.subject ?? "",
            message: data.message ?? "",
            createdAt: created,
          };
        });

        // sort newest first
        docs.sort((a, b) => {
          if (!a.createdAt) return 1;
          if (!b.createdAt) return -1;
          return b.createdAt.getTime() - a.createdAt.getTime();
        });

        setMessages(docs);
        setLoading(false);
      },
      (err: FirestoreError) => {
        console.error("❌ onSnapshot error:", err);
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsub();
  }, []);

  const handleDelete = async (id: string) => {
    const ok = confirm("Delete this message? This cannot be undone.");
    if (!ok) return;

    try {
      await deleteDoc(doc(db, "messages", id));
    } catch (err) {
      console.error("Error deleting message:", err);
      setError((err as Error).message);
    }
  };

  return (
    <section className="bg-gray-50 py-16 min-h-screen">
      <div className="mx-auto max-w-5xl px-6">
        <h1 className="text-3xl font-bold mb-6">📩 Contact Messages</h1>

        {error && <div className="mb-4 text-red-600">{error}</div>}

        {loading ? (
          <p className="text-gray-600">Loading messages...</p>
        ) : messages.length === 0 ? (
          <p className="text-gray-600">No messages yet.</p>
        ) : (
          <AnimatePresence>
            <div className="space-y-4">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  layout
                  className="bg-white shadow rounded-xl p-6"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <h2 className="font-semibold text-lg">{msg.subject || "(No subject)"}</h2>
                      <p className="text-sm text-gray-600 mt-1">{msg.message}</p>
                      <p className="mt-3 text-sm text-gray-500">
                        From: <strong>{msg.name}</strong> •{" "}
                        <a className="text-orange-600 underline" href={`mailto:${msg.email}`}>
                          {msg.email}
                        </a>
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <span className="text-sm text-gray-500">
                        {msg.createdAt ? msg.createdAt.toLocaleString() : "Pending timestamp"}
                      </span>
                      <button
                        onClick={() => handleDelete(msg.id)}
                        className="text-sm text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        )}
      </div>
    </section>
  );
}
