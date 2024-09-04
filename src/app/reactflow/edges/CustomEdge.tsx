import React, { FC, useState } from 'react';
import {
  EdgeProps,
  getBezierPath,
  EdgeLabelRenderer,
  BaseEdge,
  Edge,
} from '@xyflow/react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { PencilIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CustomEdgeProps } from '@/app/types';

const CustomEdge: FC<CustomEdgeProps> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
}) => {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const [isEditing, setIsEditing] = useState(false);

  const formSchema = z.object({
    description: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: data?.description || "user responded",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    if (data?.onChangeLabel) {
      data.onChangeLabel(id, values.description);
    }
    setIsEditing(false);
  };

  const description = form.watch('description');

  return (
    <>
      <BaseEdge id={id} path={edgePath} />
      <EdgeLabelRenderer>
        <div style={{ pointerEvents: "all" }}>
          {isEditing ? (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                style={{
                  transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
                }}
                className="nodrag nopan absolute bg-background rounded-sm text-xs border flex flex-col p-2 gap-1"
              >
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          className="p-3 h-fit min-h-6 text-xs hover:bg-accent focus-visible:bg-accent transition-all caret-indigo-500 w-full border-none font-normal focus-visible:ring-0 focus-visible:ring-offset-0"
                          placeholder="Instructions"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button variant="outline">Save</Button>
              </form>
            </Form>
          ) : (
            <div
              className="nodrag nopan absolute bg-background px-2 py-2 rounded-sm text-xs border flex items-center gap-2"
              style={{
                transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              }}
            >
              {description}
              <PencilIcon
                className="h-3 w-3 text-violet-500 cursor-pointer"
                onClick={() => setIsEditing(true)}
              />
            </div>
          )}
        </div>
      </EdgeLabelRenderer>
    </>
  );
};

CustomEdge.displayName = "CustomEdge";

export default CustomEdge;
