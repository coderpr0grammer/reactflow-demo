'use client'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { zodResolver } from "@hookform/resolvers/zod"
import { Node } from "@xyflow/react"
import { forwardRef, useEffect, useImperativeHandle, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { DefaultNodeData, EditNodeModalProps, EditNodeModalRef } from "../types"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"


const EditNodeModal = forwardRef<EditNodeModalRef, EditNodeModalProps>(
    ({ onSubmit }, ref) => {


        const [modalOpen, setModalOpen] = useState(false);
        const [node, setNode] = useState<Node<DefaultNodeData>>(
            {} as Node<DefaultNodeData>
            // { id: 'uuidv4', type: 'defaultNode', position: { x: 0, y: 0 }, data: { userReadableType: 'Default', title: "New Node", instructions: "Placeholder instructions for agent to say" } }
        );

        const { data } = node

        const formSchema = z.object({
            title: z.string(),
            instructions: z.string()
        })


        const form = useForm<z.infer<typeof formSchema>>({
            resolver: zodResolver(formSchema),
            defaultValues: {
                title: node?.data?.title,
                instructions: node?.data?.instructions,
            },
        });
        // Update form values when node changes
        useEffect(() => {
            form.reset({
                title: data?.title || "New Node",
                instructions: data?.instructions || "Placeholder instructions for agent to say",
            });
        }, [data, form]);

        const handleSubmit = (values: z.infer<typeof formSchema>) => {
            if (!node) return
            const newNode = {
                ...node,
                data: {
                    ...node.data,
                    ...values
                }
            }
            onSubmit(newNode)
            // console.log(values)
        }


        useImperativeHandle(ref, () => {
            return {
                open(node: Node<DefaultNodeData>) {
                    console.log(node)
                    setNode(node)
                    setModalOpen(true)
                },
                close() {
                    setModalOpen(false)
                    setNode({} as Node<DefaultNodeData>)
                }
            };
        }, []);

        // console.log(node)

        return (
            <AlertDialog open={modalOpen} onOpenChange={setModalOpen}>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} >
                        <AlertDialogContent >
                            <AlertDialogHeader>
                                <AlertDialogTitle className="capitalize">Edit {node?.data?.userReadableType as string} Node </AlertDialogTitle>
                                {/* <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete your account
                                and remove your data from our servers.
                            </AlertDialogDescription> */}
                            </AlertDialogHeader>
                            <div className="space-y-4">

                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Title</FormLabel>
                                            <FormControl>
                                                <Input placeholder="" {...field} />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="instructions"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Instructions for Agent</FormLabel>
                                            <FormControl>
                                                <Input placeholder="" {...field} />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                            </div>
                            <AlertDialogFooter>
                                <AlertDialogCancel type="button" onClick={close}>Cancel</AlertDialogCancel>
                                <AlertDialogAction type="submit" onClick={()=> handleSubmit(form.getValues())}>Save</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </form>
                </Form>

            </AlertDialog >

        )
    })

export default EditNodeModal