'use client'
import React, { memo, useEffect } from 'react';
import { Handle, Position } from '@xyflow/react';
import type { Node, NodeProps } from '@xyflow/react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { PhoneIcon, PhoneIncoming, PhoneIncomingIcon, PlayIcon } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { StartNodeType } from '@/app/types';



const EndNode = ({ data, selected }: NodeProps<StartNodeType>) => {



  const { title, instructions } = data;

  return (
    <div>
      <Card className={` w-[320px]  border ${selected ? 'border-indigo-500 border-2' : 'border-border '} rounded-md overflow-hidden`}>
        <CardHeader className='p-4 py-3 flex flex-row items-center !space-x-2'>
          <div className='shrink-0 bg-accent border border-border w-[24px] h-[24px] rounded-md flex items-center justify-center '>
            <PhoneIncomingIcon className='h-[12px] w-[12px]' />
          </div>
          <CardTitle className='text-xs font-medium leading-5 !m-0'>{title || "End Phone Call"}</CardTitle>
         
        </CardHeader>
        <Separator />
        <CardContent className='p-2 '>
          <div className='p-3 hover:bg-accent focus-visible:bg-accent transition-all rounded-sm caret-indigo-500 h-full w-full resize-none border-none  text-xs font-normal focus-visible:ring-0 focus-visible:ring-offset-0'>
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
    </div>
  );
}

EndNode.displayName = "EndNode";
export default memo(EndNode);