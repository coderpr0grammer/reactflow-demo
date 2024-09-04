'use client'
import React, { memo, useEffect } from 'react';
import { Handle, Position } from '@xyflow/react';
import type { Node, NodeProps } from '@xyflow/react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { PhoneIcon, PlayIcon } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form';
import type { StartNodeType } from '@/app/types';


const StartNode = ({ data, selected }: NodeProps<StartNodeType>) => {


  // const formSchema = z.object({
  //   instructions: z.string()
  // })

  // const form = useForm<z.infer<typeof formSchema>>({
  //   resolver: zodResolver(formSchema),
  //   defaultValues: {
  //     instructions: "",
  //   },
  // })

  // // 2. Define a submit handler.
  // function onSubmit(values: z.infer<typeof formSchema>) {
  //   // Do something with the form values.
  //   // ✅ This will be type-safe and validated.
  //   console.log(values)
  // }

  // useEffect(() => {
  //   const subscription = form.watch((value, { name, type }) => {
  //     // When the form values change, submit the form
  //     form.handleSubmit(onSubmit)();
  //   });
  //   return () => subscription.unsubscribe();
  // }, [form]);

  const { instructions } = data;

  return (
    <div>
      <Card className={` w-[320px]  border ${selected ? 'border-indigo-500 border-2' : 'border-border '} rounded-md overflow-hidden`}>
        <CardHeader className='p-4 py-3 flex flex-row items-center !space-x-2'>
          <div className='shrink-0 bg-accent border border-border w-[24px] h-[24px] rounded-md flex items-center justify-center '>
            <PlayIcon className='h-[12px] w-[12px]' />
          </div>
          <CardTitle className='text-xs font-medium leading-5 !m-0'>Start Phone Call</CardTitle>
          {/* <CardDescription>{job}</CardDescription> */}
        </CardHeader>
        <Separator />
        <CardContent className='p-2 '>
          {/* <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="instructions"
                render={({ field }) => (
                  <FormItem>

                    <FormControl> */}
          <div className='p-3 hover:bg-accent focus-visible:bg-accent transition-all rounded-sm caret-indigo-500 h-full w-full resize-none border-none  text-xs font-normal focus-visible:ring-0 focus-visible:ring-offset-0'>
            {instructions}
          </div>
          {/* 
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />


            </form>
          </Form> */}
        </CardContent>

      </Card>

      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={true}
        style={{
          width: 10,
          height: 10,
        }}
        className="w-24 h-24 !bg-indigo-500"
      />
    </div>
  );
}

export default memo(StartNode);