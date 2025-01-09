import { useAppContext } from "@/context/AppContext";
import { useSocket } from "@/context/SocketContext";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import { SocketEvent } from "@/types/socket";
import { useCallback, useEffect } from "react";
import { HistoryEntry, RecordsDiff, TLRecord, Tldraw, useEditor } from "tldraw";

function DrawingEditor() {
    const { isMobile } = useWindowDimensions();

    return (
        <Tldraw
            inferDarkMode
            forceMobile={isMobile}
            defaultName="Editor"
            className="z-0"
        >
            <CollaborativeEditor />
        </Tldraw>
    );
}

function CollaborativeEditor() {
    const editor = useEditor();
    const { drawingData, setDrawingData } = useAppContext();
    const { socket } = useSocket();

    const handleChangeEvent = useCallback(
        (change) => {
            const snapshot = change.changes;
            // Update the drawing data in the context
            setDrawingData(editor.store.getSnapshot());
            // Emit the snapshot to the server
            socket.emit(SocketEvent.DRAWING_UPDATE, { snapshot });
        },
        [editor.store, setDrawingData, socket]
    );

    const handleRemoteDrawing = useCallback(
        ({ snapshot }) => {
            editor.store.mergeRemoteChanges(() => {
                const { added, updated, removed } = snapshot;

                for (const record of Object.values(added)) {
                    editor.store.put([record]);
                }
                for (const [, to] of Object.values(updated)) {
                    editor.store.put([to]);
                }
                for (const record of Object.values(removed)) {
                    editor.store.remove([record.id]);
                }
            });

            setDrawingData(editor.store.getSnapshot());
        },
        [editor.store, setDrawingData]
    );

    useEffect(() => {
        if (drawingData && Object.keys(drawingData).length > 0) {
            editor.store.loadSnapshot(drawingData);
        }
    }, [drawingData, editor.store]);

    useEffect(() => {
        const cleanupFunction = editor.store.listen(handleChangeEvent, {
            source: "user",
            scope: "document",
        });

        socket.on(SocketEvent.DRAWING_UPDATE, handleRemoteDrawing);

        return () => {
            cleanupFunction();
            socket.off(SocketEvent.DRAWING_UPDATE);
        };
    }, [editor.store, handleChangeEvent, handleRemoteDrawing, socket]);

    return null;
}

export default DrawingEditor;
