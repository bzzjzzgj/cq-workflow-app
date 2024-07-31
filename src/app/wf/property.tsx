"use client";

import {
  Description,
  Field,
  FieldGroup,
  Fieldset,
  Label,
  Legend,
} from "@/components/ui/catalyst/fieldset";
import { Select } from "@/components/ui/catalyst/select";
import { Text } from "@/components/ui/catalyst/text";
import { Textarea } from "@/components/ui/catalyst/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/shadcn/accordion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";

import { Button } from "@/components/ui/shadcn/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/shadcn/form";
import { Input } from "@/components/ui/shadcn/input";

const formSchema = z.object({
  name: z
    .string({
      message: "请输入名称",
    })

    .min(2, {
      message: "输入字符长度不足 2 个，请重新输入",
    })
    .max(50, {
      message: "输入字符长度超过 50 个，请重新输入",
    }),

  desc: z
    .string({
      message: "请输入描述",
    })
    .max(500, {
      message: "描述最多只能输入 500 个字符",
    }),
});

export default function WfProperty() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    // Do something with the form data...
    console.log(data);
  };

  return (
    <>
      <Accordion type="single" collapsible defaultValue="item-1">
        <AccordionItem value="item-1">
          <AccordionTrigger>基础</AccordionTrigger>
          <AccordionContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 px-2"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>名称</FormLabel>
                      <FormControl>
                        <Input placeholder="shadcn" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="desc"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>描述</FormLabel>
                      <FormControl>
                        <Textarea placeholder="shadcn" {...field}></Textarea>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>高级</AccordionTrigger>
          <AccordionContent>2222</AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
}
