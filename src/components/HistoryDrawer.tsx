import React from "react";
import { X, History, Trash2, ChevronRight, Clock } from "lucide-react";
import { ChatHistoryItem } from "../types";
import { translations } from "../data/translations";

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  history: ChatHistoryItem[];
  onSelectHistoryItem: (item: ChatHistoryItem) => void;
  onClearHistory: () => void;
  onDeleteItem: (id: string) => void;
  language: "bn" | "en";
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  isOpen,
  onClose,
  history,
  onSelectHistoryItem,
  onClearHistory,
  onDeleteItem,
  language,
}) => {
  if (!isOpen) return null;
  const t = translations[language];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-900/60 dark:bg-black/80 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md bg-white dark:bg-stone-900 border-l border-stone-200 dark:border-stone-800 shadow-2xl flex flex-col h-full transition-colors duration-200">
          {/* Header */}
          <div className="px-4 sm:px-5 py-3.5 sm:py-4 bg-stone-900 dark:bg-black text-stone-100 flex items-center justify-between border-b border-stone-800">
            <div className="flex items-center gap-2">
              <History className="w-5 h-5 text-blue-400 shrink-0" />
              <h2 className="text-base font-semibold text-white">
                {t.historyDrawerTitle}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="min-h-[40px] min-w-[40px] p-2 rounded-xl text-stone-400 hover:text-white hover:bg-stone-800 dark:hover:bg-stone-850 active:bg-stone-700 transition-colors flex items-center justify-center cursor-pointer"
              title="Close drawer"
              aria-label="Close drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-2.5">
            {history.length === 0 ? (
              <div className="text-center py-16 px-4 text-stone-400 dark:text-stone-500">
                <Clock className="w-10 h-10 mx-auto mb-2 text-stone-300 dark:text-stone-700 stroke-1" />
                <p className="text-sm font-medium text-stone-600 dark:text-stone-300">
                  {t.historyEmptyTitle}
                </p>
                <p className="text-xs text-stone-400 dark:text-stone-500 mt-1">
                  {t.historyEmptyDesc}
                </p>
              </div>
            ) : (
              history.map((item) => (
                <div
                  key={item.id}
                  className="bg-stone-50 dark:bg-stone-850 hover:bg-blue-50/50 dark:hover:bg-blue-950/40 border border-stone-200 dark:border-stone-800 hover:border-blue-300 dark:hover:border-blue-700 rounded-xl p-3 sm:p-3.5 transition-all flex flex-col justify-between"
                >
                  <div
                    onClick={() => {
                      onSelectHistoryItem(item);
                      onClose();
                    }}
                    className="cursor-pointer active:opacity-75"
                  >
                    <div className="flex items-center justify-between text-[11px] text-stone-400 dark:text-stone-500 mb-1">
                      <span>
                        {new Date(item.timestamp).toLocaleDateString([], {
                          month: "short",
                          day: "numeric",
                        })}{" "}
                        •{" "}
                        {new Date(item.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                      {item.sources.length > 0 && (
                        <span className="text-blue-600 dark:text-blue-400 font-medium">
                          {t.historyReferencesCount(item.sources.length)}
                        </span>
                      )}
                    </div>
                    <h4 className="text-xs sm:text-sm font-semibold text-stone-800 dark:text-stone-100 hover:text-blue-950 dark:hover:text-blue-300 line-clamp-2 leading-snug">
                      {item.question}
                    </h4>
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-stone-200/60 dark:border-stone-800 flex items-center justify-between">
                    <button
                      onClick={() => {
                        onSelectHistoryItem(item);
                        onClose();
                      }}
                      className="min-h-[36px] py-1 text-xs text-blue-600 dark:text-blue-400 font-semibold flex items-center gap-1 hover:underline active:opacity-75 cursor-pointer"
                    >
                      <span>{t.historyViewAnswer}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteItem(item.id);
                      }}
                      className="min-h-[36px] min-w-[36px] p-1.5 rounded-lg text-stone-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors flex items-center justify-center cursor-pointer"
                      title={t.historyDelete}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Actions */}
          {history.length > 0 && (
            <div className="p-3 sm:p-4 border-t border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-850">
              <button
                onClick={onClearHistory}
                className="w-full flex items-center justify-center gap-1.5 min-h-[42px] py-2 rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/60 active:bg-red-100 border border-red-200 dark:border-red-900/60 text-xs font-semibold transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                <span>{t.historyClearAll}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
