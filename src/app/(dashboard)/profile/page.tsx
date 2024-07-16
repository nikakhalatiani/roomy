"use client";
import { Icons } from "@/components/Icons";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarDays } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { z } from "zod";
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

const PersonalDataValidator = z.object({
  image: z.instanceof(File, { message: "Profile image is required" }),
  username: z
    .string({ required_error: "Your name is required" })
    .min(1, { message: "Your name is required" })
    .max(50, { message: "Name is too long" }),
  dob: z.date({
    required_error: "Date of birth is required",
  }),
  major: z.string({ required_error: "Your major is required" }),
  year: z.string().optional(),
  minor: z.string().optional(),
  morningPerson: z.boolean().default(false),
});

type TPersonalDataValidator = z.infer<typeof PersonalDataValidator>;

const Page = () => {
  const form = useForm<TPersonalDataValidator>({
    resolver: zodResolver(PersonalDataValidator),
    defaultValues: {
      morningPerson: false, // Set default value here
    },
  });

  const [load, setLoad] = useState<boolean>(false);

  const onSubmit = (data: TPersonalDataValidator) => {

    setLoad(true);
    const formData = new FormData();
    formData.append("image", data.image as File);
    formData.append("username", data.username);
    formData.append("dob", data.dob.toISOString());
    formData.append("major", data.major);
    formData.append("year", data.year || "");
    formData.append("minor", data.minor || "");
    formData.append("morningPerson", data.morningPerson.toString());

    // Process the form data as needed
    console.log("Form Data", formData);
    // You can use the formData object to send the data to your server or API
  };

  return (
    <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
      <div className="mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[360px]">
        <div className="flex flex-col items-center text-center">
          <Icons.profileLogo
            className={cn("w-20 h-20", load ? "" : "animate-pulse")}
          />
          <h1 className="text-2xl font-bold">
            Create your <span className="text-rose-600">own</span> profile to
            get started
          </h1>
        </div>
        <div className="grid gap-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-950 pl-1">
                        Profile Image
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="image"
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            field.onChange(e.target.files?.[0] || null);
                          }}
                          className={cn("focus-visible:ring-transparent", {
                            "border-rose-600": form.formState.errors.image,
                          })}
                        />
                      </FormControl>

                      {!form.formState.errors.image && (
                        <FormDescription className="text-xs pl-1">
                          This image will be displayed on your profile
                        </FormDescription>
                      )}
                      {form.formState.errors.image && (
                        <FormMessage className="text-rose-600 text-sm mt-1 pl-1">
                          {form.formState.errors.image.message}
                        </FormMessage>
                      )}
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-950 pl-1">
                        Profile Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="username"
                          placeholder="Nikolai Khalatiani"
                          {...field}
                          className={cn("focus-visible:ring-transparent", {
                            "border-rose-600": form.formState.errors.username,
                          })}
                        />
                      </FormControl>
                      {!form.formState.errors.username && (
                        <FormDescription className="text-xs pl-1">
                          This is your publicly displayed name
                        </FormDescription>
                      )}
                      {form.formState.errors.username && (
                        <FormMessage className="text-rose-600 text-sm pl-1">
                          {form.formState.errors.username.message}
                        </FormMessage>
                      )}
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="dob"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-950 pl-1">
                            Date of Birth
                          </FormLabel>
                          <FormControl>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full justify-start text-left font-normal",
                                    {
                                      "border-rose-600 focus-visible:ring-rose-600":
                                        form.formState.errors.dob,
                                    }
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PP")
                                  ) : (
                                    <>
                                      <CalendarDays className="mr-2 h-4 w-4" />
                                      <span>Pick a Date</span>
                                    </>
                                  )}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-auto p-0"
                                align="start"
                              >
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={(selectedDate) =>
                                    field.onChange(selectedDate)
                                  }
                                  initialFocus
                                  fromYear={2000}
                                  toYear={2007}
                                  captionLayout="dropdown-buttons"
                                />
                              </PopoverContent>
                            </Popover>
                          </FormControl>

                          {form.formState.errors.dob && (
                            <FormMessage className="text-rose-600 text-sm mt-1 pl-1">
                              {form.formState.errors.dob.message}
                            </FormMessage>
                          )}
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="year"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-950 pl-1">
                            Year of Study
                          </FormLabel>
                          <FormControl>
                            <Select {...field}>
                              <SelectTrigger
                                id="year"
                                className="w-full text-muted-foreground focus:ring-transparent"
                              >
                                <SelectValue placeholder="Optional" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectItem value="freshman">
                                    Freshman - 1st
                                  </SelectItem>
                                  <SelectItem value="sophomore">
                                    Sophomore - 2nd
                                  </SelectItem>
                                  <SelectItem value="junior">
                                    Junior - 3rd
                                  </SelectItem>
                                  <SelectItem value="senior">
                                    Senior - 4th
                                  </SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="major"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-950 pl-1">
                            Major
                          </FormLabel>
                          <FormControl>
                            <Select
                              value={field.value}
                              onValueChange={(value) => field.onChange(value)}
                            >
                              <SelectTrigger
                                id="major"
                                className={cn("focus:ring-transparent", {
                                  "border-rose-600":
                                    form.formState.errors.major,
                                })}
                              >
                                <SelectValue placeholder="What you study" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectItem value="CS">
                                    Computer Science
                                  </SelectItem>
                                  <SelectItem value="MGMT">
                                    Management
                                  </SelectItem>
                                  <SelectItem value="Math">Math</SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          {form.formState.errors.major && (
                            <FormMessage className="text-rose-600 text-sm mt-1 pl-1">
                              {form.formState.errors.major.message}
                            </FormMessage>
                          )}
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="minor"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-950 pl-1">
                            Minor
                          </FormLabel>
                          <FormControl>
                            <Select {...field}>
                              <SelectTrigger className="w-full focus:ring-transparent text-muted-foreground">
                                <SelectValue placeholder="Optional" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectItem value="CS">
                                    Computer Science
                                  </SelectItem>
                                  <SelectItem value="MGMT">
                                    Management
                                  </SelectItem>
                                  <SelectItem value="Math">Math</SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <FormField
                  control={form.control}
                  name="morningPerson"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm w-full">
                          <div className="space-y-0.5">
                            <FormLabel
                              htmlFor="morningPerson"
                              className="text-gray-950"
                            >
                              Morning Person
                            </FormLabel>
                            <FormDescription className="text-xs">
                              Indicate this if you prefer to wake up early
                            </FormDescription>
                          </div>
                          <Switch
                            id="morningPerson"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button type="submit">Save Personal Info</Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Page;
