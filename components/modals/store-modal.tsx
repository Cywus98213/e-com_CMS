"use client";

import { useStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "../modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import axios from "axios";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

const formSchema = z.object({
  storeName: z.string().min(1).max(20),
});

export const CreateStoreModal = () => {
  const [loading, setLoading] = useState(false);

  // 1. Define a form Schema for type-safe and validated.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      storeName: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      setLoading(true);
      const res = await axios.post("/api/stores", values);
      toast.success("Store Created.");
      window.location.assign(`/${res.data.id}`);
    } catch (error) {
      toast.error("Failed to create store, Try Again.");
    } finally {
      setLoading(false);
    }
  }

  const storeModal = useStoreModal();

  return (
    <Modal
      title="Create Store"
      description="Add a new Store"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="storeName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Store Name :</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your Store Name"
                    {...field}
                    disabled={loading}
                  />
                </FormControl>
                <FormDescription>
                  This is your public Store name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-5 justify-between">
            <Button
              type="submit"
              className="px-7 flex gap-2"
              disabled={loading}
            >
              <LoaderCircle
                className={cn("animate-spin", !loading && "hidden")}
              />
              Submit
            </Button>
            <Button
              disabled={loading}
              className="px-7"
              type="button"
              variant="outline"
              onClick={storeModal.onClose}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
};
