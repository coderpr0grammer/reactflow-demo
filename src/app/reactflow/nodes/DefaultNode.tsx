'use client'
import React, { memo, useCallback, useEffect } from 'react';
import { Handle, Position } from '@xyflow/react';
import type { Node, NodeProps } from '@xyflow/react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { PhoneCallIcon, PhoneIcon, PlayIcon } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { DefaultNodeType } from '@/app/types';



const StartNode = ({ data, selected, id }: NodeProps<DefaultNodeType>) => {

  const { title, instructions } = data;


  return (
    <div>
    

          <Card className={` w-[320px]  border ${selected ? 'border-indigo-500 border-2' : 'border-border '} rounded-md overflow-hidden`}>
            <CardHeader className='p-4 py-3 flex flex-row items-center justify-start space-x-0.5 space-y-0'>
              <div className='shrink-0 bg-accent border border-border w-[24px] h-[24px] rounded-md flex items-center justify-center '>
                <PhoneCallIcon className='h-[12px] w-[12px]' />
              </div>
             

              <div className='text-left p-0 px-2 py-1 rounded-sm h-auto caret-indigo-500 hover:bg-accent transition-all  w-full border-none  text-xs font-normal focus-visible:ring-0 focus-visible:ring-offset-0'  >
                {title || "New Default Node"}
              </div>


            </CardHeader>
            <Separator />
            <CardContent className='p-2 '>
             
              <div

                className='p-3 hover:bg-accent focus-visible:bg-accent transition-all rounded-sm caret-indigo-500 h-full w-full resize-none border-none  text-xs font-normal focus-visible:ring-0 focus-visible:ring-offset-0' >
                {instructions}
              </div>


            </CardContent>

          </Card>
        

      <Handle
        type="target"
        position={Position.Top}
        isConnectable={true}
        style={{
          width: 10,
          height: 10,
        }}
        className="w-24 h-24 !bg-indigo-500"
      />

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

StartNode.displayName = "StartNode";

export default memo(StartNode);