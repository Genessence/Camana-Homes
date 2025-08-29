import React from "react";
import { Bold, Italic, Underline, List, ListOrdered, AlignLeft, AlignCenter, AlignRight } from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = "Enter your content...",
  className = "",
}) => {
  const editorRef = React.useRef<HTMLDivElement>(null);
  const [isInitialized, setIsInitialized] = React.useState(false);
  const [internalValue, setInternalValue] = React.useState(value);

  // Only update innerHTML on initial mount or when value changes externally
  React.useEffect(() => {
    if (editorRef.current && !isInitialized) {
      editorRef.current.innerHTML = value;
      setIsInitialized(true);
      setInternalValue(value);
    }
  }, [value, isInitialized]);

  // Handle external value changes (e.g., form reset)
  React.useEffect(() => {
    if (isInitialized && value !== internalValue) {
      if (editorRef.current) {
        editorRef.current.innerHTML = value;
        setInternalValue(value);
      }
    }
  }, [value, internalValue, isInitialized]);

  const handleInput = () => {
    if (editorRef.current) {
      const newValue = editorRef.current.innerHTML;
      setInternalValue(newValue);
      onChange(newValue);
    }
  };

  // Preserve cursor position when component re-renders
  const preserveCursorPosition = () => {
    if (editorRef.current) {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        if (editorRef.current.contains(range.commonAncestorContainer)) {
          // Store cursor position relative to the editor
          const startOffset = range.startOffset;
          const endOffset = range.endOffset;
          const startContainer = range.startContainer;
          const endContainer = range.endContainer;
          
          // Restore cursor position after a brief delay
          setTimeout(() => {
            if (editorRef.current) {
              try {
                const newRange = document.createRange();
                newRange.setStart(startContainer, startOffset);
                newRange.setEnd(endContainer, endOffset);
                selection.removeAllRanges();
                selection.addRange(newRange);
              } catch (e) {
                // If restoration fails, place cursor at end
                const range = document.createRange();
                range.selectNodeContents(editorRef.current);
                range.collapse(false);
                selection.removeAllRanges();
                selection.addRange(range);
              }
            }
          }, 0);
        }
      }
    }
  };

  const execCommand = (command: string, value?: string) => {
    // Save current selection
    const selection = window.getSelection();
    const range = selection?.getRangeAt(0);
    
    document.execCommand(command, false, value);
    
    // Restore focus and selection
    if (editorRef.current) {
      editorRef.current.focus();
      
      // Try to restore cursor position if we had a selection
      if (selection && range) {
        try {
          selection.removeAllRanges();
          selection.addRange(range);
        } catch (e) {
          // If range restoration fails, just place cursor at end
          const range = document.createRange();
          range.selectNodeContents(editorRef.current);
          range.collapse(false);
          selection.removeAllRanges();
          selection.addRange(range);
        }
      }
    }
  };

  const isActive = (command: string) => {
    return document.queryCommandState(command);
  };

  return (
    <div className={`border border-gray-300 rounded-md ${className}`}>
      {/* Toolbar */}
      <div className="flex items-center gap-1 p-2 border-b border-gray-300 bg-gray-50">
        <button
          type="button"
          onClick={() => execCommand("bold")}
          className={`p-2 rounded hover:bg-gray-200 ${isActive("bold") ? "bg-gray-300" : ""}`}
          title="Bold"
        >
          <Bold className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => execCommand("italic")}
          className={`p-2 rounded hover:bg-gray-200 ${isActive("italic") ? "bg-gray-300" : ""}`}
          title="Italic"
        >
          <Italic className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => execCommand("underline")}
          className={`p-2 rounded hover:bg-gray-200 ${isActive("underline") ? "bg-gray-300" : ""}`}
          title="Underline"
        >
          <Underline className="w-4 h-4" />
        </button>
        <div className="w-px h-6 bg-gray-300 mx-2" />
        <button
          type="button"
          onClick={() => execCommand("insertUnorderedList")}
          className={`p-2 rounded hover:bg-gray-200 ${isActive("insertUnorderedList") ? "bg-gray-300" : ""}`}
          title="Bullet List"
        >
          <List className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => execCommand("insertOrderedList")}
          className={`p-2 rounded hover:bg-gray-200 ${isActive("insertOrderedList") ? "bg-gray-300" : ""}`}
          title="Numbered List"
        >
          <ListOrdered className="w-4 h-4" />
        </button>
        <div className="w-px h-6 bg-gray-300 mx-2" />
        <button
          type="button"
          onClick={() => execCommand("justifyLeft")}
          className={`p-2 rounded hover:bg-gray-200 ${isActive("justifyLeft") ? "bg-gray-300" : ""}`}
          title="Align Left"
        >
          <AlignLeft className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => execCommand("justifyCenter")}
          className={`p-2 rounded hover:bg-gray-200 ${isActive("justifyCenter") ? "bg-gray-300" : ""}`}
          title="Align Center"
        >
          <AlignCenter className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => execCommand("justifyRight")}
          className={`p-2 rounded hover:bg-gray-200 ${isActive("justifyRight") ? "bg-gray-300" : ""}`}
          title="Align Right"
        >
          <AlignRight className="w-4 h-4" />
        </button>
      </div>
      
      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onKeyDown={(e) => {
          // Handle Enter key to prevent cursor jumping
          if (e.key === 'Enter') {
            // Let the default behavior happen first
            setTimeout(() => {
              if (editorRef.current) {
                // Ensure the editor maintains focus
                editorRef.current.focus();
                
                // Place cursor at the end of the new line
                const selection = window.getSelection();
                if (selection) {
                  const range = document.createRange();
                  range.selectNodeContents(editorRef.current);
                  range.collapse(false);
                  selection.removeAllRanges();
                  selection.addRange(range);
                }
              }
            }, 0);
          }
        }}
        onFocus={() => {
          // Ensure cursor is at the end when focusing
          if (editorRef.current) {
            const selection = window.getSelection();
            if (selection) {
              const range = document.createRange();
              range.selectNodeContents(editorRef.current);
              range.collapse(false);
              selection.removeAllRanges();
              selection.addRange(range);
            }
          }
        }}
        className="p-3 min-h-[200px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
        placeholder={placeholder}
        suppressContentEditableWarning
      />
    </div>
  );
};
