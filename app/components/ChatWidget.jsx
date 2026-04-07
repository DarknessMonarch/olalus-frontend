"use client";

import { useState, useEffect, useRef } from "react";
import styles from "@/app/styles/chatWidget.module.css";
import { IoChatbubbleEllipses as ChatIcon, IoClose as CloseIcon, IoSend as SendIcon } from "react-icons/io5";
import { FiPaperclip as ResumeIcon } from "react-icons/fi";

const AGENT_API = process.env.NEXT_PUBLIC_SERVER_API;

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [quickActions, setQuickActions] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showResume, setShowResume] = useState(false);
  const [resumeText, setResumeText] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    if (isOpen && !sessionId) {
      startSession();
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const startSession = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${AGENT_API}/chat/start`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ page: window.location.pathname }),
      });
      const data = await res.json();
      if (data.success) {
        setSessionId(data.data.sessionId);
        setMessages([{ role: "bot", text: data.data.greeting }]);
        setQuickActions(data.data.quickActions || []);
      }
    } catch {
      setMessages([{ role: "bot", text: "Hello! I'm Olalus AI. How can I help you today?" }]);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (text) => {
    if (!text.trim() || !sessionId || loading) return;
    const userMsg = text.trim();
    setInput("");
    setQuickActions([]);
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setLoading(true);
    try {
      const res = await fetch(`${AGENT_API}/chat/message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, message: userMsg }),
      });
      const data = await res.json();
      if (data.success) {
        setMessages((prev) => [...prev, { role: "bot", text: data.data.response }]);
      }
    } catch {
      setMessages((prev) => [...prev, { role: "bot", text: "Sorry, something went wrong. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  const submitResume = async () => {
    if (!resumeText.trim() || !sessionId || loading) return;
    setShowResume(false);
    setMessages((prev) => [...prev, { role: "user", text: `[Resume submitted — ${resumeText.split(/\s+/).length} words]` }]);
    setLoading(true);
    try {
      const res = await fetch(`${AGENT_API}/chat/resume`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, resumeText }),
      });
      const data = await res.json();
      if (data.success) {
        setMessages((prev) => [...prev, { role: "bot", text: data.data.response }]);
      }
    } catch {
      setMessages((prev) => [...prev, { role: "bot", text: "Failed to process resume. Please try again." }]);
    } finally {
      setLoading(false);
      setResumeText("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button
        className={`${styles.fab} ${isOpen ? styles.fabOpen : ""}`}
        onClick={() => setIsOpen((p) => !p)}
        aria-label="Open chat"
      >
        {isOpen ? <CloseIcon /> : <ChatIcon />}
        {!isOpen && <span className={styles.fabPulse} />}
      </button>

      {isOpen && (
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <div className={styles.headerAvatar}>
              <span>AI</span>
            </div>
            <div className={styles.headerInfo}>
              <span className={styles.headerName}>Olalus AI</span>
              <span className={styles.headerStatus}>
                <span className={styles.dot} /> Online
              </span>
            </div>
            <button className={styles.closeBtn} onClick={handleClose} aria-label="Close">
              <CloseIcon />
            </button>
          </div>

          <div className={styles.messages}>
            {messages.map((msg, i) => (
              <div key={i} className={`${styles.bubble} ${msg.role === "user" ? styles.userBubble : styles.botBubble}`}>
                <p>{msg.text}</p>
              </div>
            ))}

            {loading && (
              <div className={`${styles.bubble} ${styles.botBubble}`}>
                <div className={styles.typing}>
                  <span /><span /><span />
                </div>
              </div>
            )}

            {quickActions.length > 0 && !loading && (
              <div className={styles.quickActions}>
                {quickActions.map((action, i) => (
                  <button
                    key={i}
                    className={styles.quickBtn}
                    onClick={() => {
                      if (action.action === "resume") {
                        setShowResume(true);
                        setQuickActions([]);
                      } else {
                        sendMessage(action.label);
                      }
                    }}
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {showResume ? (
            <div className={styles.resumePanel}>
              <p className={styles.resumeHint}>Paste your resume text below and I'll match you to our open positions.</p>
              <textarea
                className={styles.resumeInput}
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste resume here..."
                rows={6}
              />
              <div className={styles.resumeActions}>
                <button className={styles.cancelBtn} onClick={() => setShowResume(false)}>Cancel</button>
                <button className={styles.sendBtn} onClick={submitResume} disabled={!resumeText.trim()}>
                  Match Jobs
                </button>
              </div>
            </div>
          ) : (
            <div className={styles.inputRow}>
              <button
                className={styles.resumeToggle}
                onClick={() => setShowResume(true)}
                aria-label="Submit resume"
                title="Upload Resume"
              >
                <ResumeIcon />
              </button>
              <input
                className={styles.chatInput}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message..."
                disabled={loading || !sessionId}
              />
              <button
                className={styles.sendBtn}
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || loading || !sessionId}
                aria-label="Send"
              >
                <SendIcon />
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
