import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"
import DOMPurify from "dompurify"
import type { Content } from "@/lib/broadcast-types"
import { cn } from "@/lib/utils"
import { useMemo } from "react"

export function ContentDetailDialog({ content }: { content: Content["content"] }) {
  const contentHtml = useMemo(() => {
    return DOMPurify.sanitize(content ?? "")
  }, [content])
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="View content details">
          <Eye />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Content Details</DialogTitle>
          <DialogDescription className="sr-only">
            View the entire content from this content block
          </DialogDescription>
        </DialogHeader>
        <div
          // Same styles as the editor
          className={cn(
            "max-h-[400px] overflow-y-auto",
            "[&_h1]:text-3xl [&_h2]:text-2xl [&_h3]:text-xl [&_h4]:text-lg [&_h5]:text-base [&_h6]:text-sm",
            "[&_ul]:my-2 [&_ul]:list-disc [&_ul]:pl-6",
            "[&_ol]:my-2 [&_ol]:list-decimal [&_ol]:pl-6",
            "[&_blockquote]:mt-2 [&_blockquote]:border-border [&_blockquote]:border-l-2 [&_blockquote]:pl-4 [&_blockquote]:italic",
            "[&_code]:rounded [&_code]:bg-muted [&_code]:px-1 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-sm",
            "[&_pre]:mt-2 [&_pre]:whitespace-break-spaces [&_pre]:rounded-md [&_pre]:bg-muted [&_pre]:p-4 [&_pre]:font-mono [&_pre]:text-sm",
            "[&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary/80"
          )}
          // biome-ignore lint/security/noDangerouslySetInnerHtml: This is sanitised content from the backend
          dangerouslySetInnerHTML={{
            __html: contentHtml
          }}
        />
      </DialogContent>
    </Dialog>
  )
}
