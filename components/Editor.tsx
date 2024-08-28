'use client'	

import {BlockNoteEditor,PartialBlock} from '@blocknote/core'
import {BlockNoteView,useBlockNote, useCreateBlockNote} from '@blocknote/react'
import '@blocknote/react/style.css'
import { useTheme } from "next-themes"
import React from "react";

import { useEdgeStore } from "@/lib/edgestore"

interface EditorProps{
  onChange:() => void
  initialContent?:string
  editable?:boolean
}

const Editor: React.FC<EditorProps> = ({
  onChange,
  initialContent,
  editable,
}) => { 
  const {resolvedTheme} = useTheme()
  const {edgestore} = useEdgeStore()

  const handleUpload = async (file:File) => {
    const response = await edgestore.publicFiles.upload({file})

    return response.url
  }

  const editor: BlockNoteEditor = useCreateBlockNote({
    initialContent: initialContent
    ? (JSON.parse(initialContent) as PartialBlock[])
    :undefined,
    uploadFile:handleUpload,
  });
  return (
    <BlockNoteView 
      editor={editor}
      editable={editable}
      theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
      onChange={onChange}
    />
  );
};

// function Editor ({onChange,initialContent,editable}:EditorProps) {

//   const {resolvedTheme} = useTheme()
//   const {edgestore} = useEdgeStore()

//   const handleUpload = async (file:File) => {
//     const response = await edgestore.publicFiles.upload({file})

//     return response.url
//   }

//   const editor:BlockNoteEditor = useBlockNote({
//     editable,
//     initialContent:initialContent ? JSON.parse(initialContent) as PartialBlock[] : undefined,
//     onEditorContentChange:(editor) => {
//       onChange(JSON.stringify(editor.topLevelBlocks,null,2))
//     },
//     uploadFile:handleUpload
//   })

// return (
//     <div>
//       <BlockNoteView editor={editor} theme={resolvedTheme === 'dark' ? 'dark' : 'light'}/>
//     </div>
//   )
// }

export default Editor