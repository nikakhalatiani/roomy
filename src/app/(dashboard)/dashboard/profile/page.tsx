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
import {
  TPersonalDataValidator,
  PersonalDataValidator,
} from "@/lib/validators/personal-data-validator";
import axios, { AxiosError } from "axios";
import { z } from "zod";

const Page = () => {
  const form = useForm<TPersonalDataValidator>({
    resolver: zodResolver(PersonalDataValidator),
    defaultValues: {
      morningPerson: false,
      minor: "",
      year: "",
    },
  });

  const [load, setLoad] = useState<boolean>(false);

  const addProfile = async (data: TPersonalDataValidator) => {
    try {
      await axios.post("/api/profile/add", data);
      setLoad(true);
    } catch (error) {
      if (error instanceof z.ZodError) {
        form.setError("root", { message: error.message });
        return;
      }
      if (error instanceof AxiosError) {
        form.setError("root", { message: error.response?.data });
        return;
      }
      form.setError("root", { message: "An error occurred" });
    }
  };

  const onSubmit = (data: TPersonalDataValidator) => {
    addProfile(data);
  };

  // Function to set load to false on form field change
  const handleFieldChange = () => {
    setLoad(false);
  };

  return (
    <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
      <div className="mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[360px]">
        <div className="flex flex-col items-center text-center">
          <Icons.profileLogo
            className={cn(
              "w-20 h-20",
              load ? "" : "animate-bounce duration-550"
            )}
          />
          <h1 className="text-2xl font-bold">
            Set up your <span className="text-rose-600">own</span> profile to
            let others know you
          </h1>
        </div>
        <div className="grid gap-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-2 mb-4">
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
                            handleFieldChange(); // Call to set load to false
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
                          onChange={(e) => {
                            field.onChange(e);
                            handleFieldChange(); // Call to set load to false
                          }}
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
                                  onSelect={(selectedDate) => {
                                    field.onChange(selectedDate);
                                    handleFieldChange(); // Call to set load to false
                                  }}
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
                            <Select
                              value={field.value}
                              onValueChange={(value) => {
                                field.onChange(value);
                                handleFieldChange(); // Call to set load to false
                              }}
                            >
                              {" "}
                              <SelectTrigger
                                id="year"
                                className="w-full text-muted-foreground focus:ring-transparent"
                              >
                                <SelectValue placeholder="Optional" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectItem value="Freshman">
                                    Freshman - 1st
                                  </SelectItem>
                                  <SelectItem value="Sophomore">
                                    Sophomore - 2nd
                                  </SelectItem>
                                  <SelectItem value="Junior">
                                    Junior - 3rd
                                  </SelectItem>
                                  <SelectItem value="Senior">
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
                              onValueChange={(value) => {
                                field.onChange(value);
                                handleFieldChange(); // Call to set load to false
                              }}
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
                            <Select
                              value={field.value}
                              onValueChange={(value) => {
                                field.onChange(value);
                                handleFieldChange(); // Call to set load to false
                              }}
                            >
                              {" "}
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
                                  <SelectItem value="None">None yet</SelectItem>
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
                            onCheckedChange={(checked) => {
                              field.onChange(checked);
                              handleFieldChange(); // Call to set load to false
                            }}
                          />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />

                {load ? (
                  <p className="text-sm text-emerald-500 flex justify-center font-bold">
                    Data added successfully
                  </p>
                ) : (
                  <p className="text-sm text-rose-600 flex justify-center font-bold">
                    {form.formState.errors.root?.message}
                  </p>
                )}
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
