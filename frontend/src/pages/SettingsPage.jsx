import React from "react";
import { useThemeStore } from "../store/useThemeStore";
import { THEMES } from "../constants";
import { Send, Paintbrush, Eye } from "lucide-react";

const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey! How's it going?", isSent: false },
  { id: 2, content: "I'm doing great! Just working on some new features.", isSent: true },
];

function SettingsPage() {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="min-h-screen pt-20 px-4 container mx-auto max-w-5xl">
      <div className="space-y-10">
        {/* Theme Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Paintbrush className="text-primary" />
            <h2 className="text-xl font-semibold">Theme Selection</h2>
          </div>
          <p className="text-sm text-base-content/70">
            Choose your preferred look and feel.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
            {THEMES.map((t) => (
              <button
                key={t}
                className={`group p-3 rounded-xl border transition-all duration-200
                  ${theme === t
                    ? "border-primary bg-base-200"
                    : "border-base-200 hover:bg-base-100"}
                `}
                onClick={() => setTheme(t)}
              >
                <div
                  className="h-10 w-full rounded overflow-hidden shadow-inner mb-1"
                  data-theme={t}
                >
                  <div className="grid grid-cols-4 gap-px p-1 h-full">
                    <div className="rounded bg-primary" />
                    <div className="rounded bg-secondary" />
                    <div className="rounded bg-accent" />
                    <div className="rounded bg-neutral" />
                  </div>
                </div>
                <span className="text-xs font-medium text-center block truncate">
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Preview Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Eye className="text-primary" />
            <h3 className="text-xl font-semibold">Live Preview</h3>
          </div>
          <p className="text-sm text-base-content/70">
            Here's how your chat interface will look.
          </p>

          <div className="rounded-xl border border-base-300 bg-base-100 shadow-lg overflow-hidden">
            <div className="p-4 bg-base-200">
              <div className="max-w-lg mx-auto rounded-xl overflow-hidden shadow">
                {/* Chat Header */}
                <div className="flex items-center gap-3 px-4 py-3 bg-base-100 border-b border-base-300">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-content font-medium">
                    J
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">John Doe</h4>
                    <p className="text-xs text-base-content/60">Online</p>
                  </div>
                </div>

                {/* Messages */}
                <div className="p-4 space-y-4 min-h-[200px] max-h-[200px] overflow-y-auto bg-base-100">
                  {PREVIEW_MESSAGES.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isSent ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-xl px-4 py-2 shadow-sm text-sm
                          ${message.isSent
                            ? "bg-primary text-primary-content"
                            : "bg-base-200 text-base-content"
                          }`}
                      >
                        <p>{message.content}</p>
                        <p className="text-[10px] mt-1 text-opacity-60">
                          12:00 PM
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input Bar */}
                <div className="p-4 border-t border-base-300 bg-base-100">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      className="input input-bordered input-sm flex-1 text-sm"
                      placeholder="Type a message..."
                      value="This is a preview"
                      readOnly
                    />
                    <button className="btn btn-primary btn-sm px-3">
                      <Send size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>  
    </div>
  );
}

export default SettingsPage;
