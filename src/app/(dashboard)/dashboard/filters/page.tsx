"use client";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { SearchCheck } from "lucide-react";

const FilterValidator = z.object({
  gender: z.string().optional(),
  interests: z.string().optional(),
  location: z.string().optional(),
  newUsers: z.boolean().optional(),
});

type TFilterValidator = z.infer<typeof FilterValidator>;

const FiltersPage = () => {
  const form = useForm<TFilterValidator>({
    resolver: zodResolver(FilterValidator),
    defaultValues: {
      gender: "",
      interests: "",
      location: "",
      newUsers: false,
    },
  });

  const onSubmit = (data: TFilterValidator) => {
    console.log("Filters applied:", data);
  };

  return (
    <div className="container relative flex pt-8 flex-col items-center justify-center lg:px-0">
      <div className="mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[360px]">
        <div className="flex flex-col items-center text-center">
          <SearchCheck className="w-10 h-10 text-rose-600" />
          <h1 className="text-2xl font-bold">
            Customize <span className="text-rose-600">whom</span> you want to
            see
          </h1>
        </div>
        <div className="grid gap-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-2 mb-14">
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-950 pl-1">
                        Major
                      </FormLabel>
                      <FormControl>
                        <Select
                          value={field.value ?? ""}
                          onValueChange={(value) => field.onChange(value)}
                        >
                          <SelectTrigger
                            id="gender"
                            className="w-full text-muted-foreground focus:ring-transparent"
                          >
                            <SelectValue placeholder="Any" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="CS">
                                Computer Science
                              </SelectItem>
                              <SelectItem value="MGMT">Management</SelectItem>
                              <SelectItem value="Math">Math</SelectItem>
                              <SelectItem value="Any">Any</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormDescription className="text-xs pl-1">
                          This image will be displayed on your profile
                        </FormDescription>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="interests"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-950 pl-1">
                        Interests
                      </FormLabel>
                      <FormControl>
                        <Select
                          value={field.value ?? ""}
                          onValueChange={(value) => field.onChange(value)}
                        >
                          <SelectTrigger
                            id="interests"
                            className="w-full text-muted-foreground focus:ring-transparent"
                          >
                            <SelectValue placeholder="Any" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="sports">Sports</SelectItem>
                              <SelectItem value="music">Music</SelectItem>
                              <SelectItem value="tech">Technology</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-950 pl-1">
                        Originally from
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="location"
                          placeholder="Tbilisi"
                          {...field}
                          value={field.value ?? ""}
                          onChange={field.onChange}
                          className="focus-visible:ring-transparent"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="newUsers"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm w-full">
                          <div className="space-y-0.5">
                            <FormLabel
                              htmlFor="newUsers"
                              className="text-gray-950"
                            >
                              New Users
                            </FormLabel>
                          </div>
                          <Switch
                            id="newUsers"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button type="submit">Apply Filters</Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default FiltersPage;
