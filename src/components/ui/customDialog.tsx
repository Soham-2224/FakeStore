import { type ComponentProps } from "react"

// --shadcn--
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"

// --utils--
import { cn } from "@/lib/utils"

/**
 * CustomDialog component for creating customizable dialogs.
 *
 * @component
 * @param props - The component's props.
 * @param props.children - The trigger element that opens the dialog.
 * @param props.triggerClassNames - Additional CSS classes for the trigger element. Defaults to an empty string.
 * @param props.contentClassNames - Additional CSS classes for the dialog content. Defaults to an empty string.
 * @param props.title - Title for the dialog.
 * @param props.desc - Description for the dialog. This is a required property.
 * @param props.footer - Additional content to be placed in the dialog footer.
 * @param props.dialogContent - Additional JSX content to be placed in the dialog.
 * @param props.asChild - Specify if the component is treated as a child element.
 * @returns The rendered CustomDialog component as a JSX.Element.
 */

type DialogTriggerProps = ComponentProps<typeof DialogTrigger>
type DialogContentProps = ComponentProps<typeof DialogContent>

type Props = {
    children: React.ReactNode
    triggerClassNames?: DialogTriggerProps["className"]
    contentClassNames?: DialogContentProps["className"]
    title?: string
    desc?: string
    footer?: React.ReactNode
    dialogContent?: React.ReactNode
    asChild?: DialogTriggerProps["asChild"]
}

const CustomDialog = ({
    children,
    triggerClassNames = "",
    contentClassNames = "",
    title,
    desc,
    footer,
    dialogContent,
    asChild = false
}: Props) => {
    return (
        <Dialog>
            <DialogTrigger
                asChild={asChild}
                className={cn("relative overflow-hidden", triggerClassNames)}
            >
                {children}
            </DialogTrigger>
            <DialogContent className={cn("sm:max-w-[425px]", contentClassNames)}>
                <DialogHeader>
                    {title ? <DialogTitle>{title}</DialogTitle> : null}
                    {desc ? <DialogDescription>{desc}</DialogDescription> : null}
                </DialogHeader>
                {dialogContent ? dialogContent : null}
                {footer ? <DialogFooter>{footer}</DialogFooter> : null}
            </DialogContent>
        </Dialog>
    )
}

export default CustomDialog
