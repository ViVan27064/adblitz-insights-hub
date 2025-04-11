
import { useState } from "react";
import { useDashboard } from "@/contexts/DashboardContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  platform: z.string().min(1, {
    message: "Please select a platform.",
  }),
  adType: z.string().min(1, {
    message: "Please select an ad type.",
  }),
  budget: z.number().min(1, {
    message: "Budget must be at least $1.",
  }),
  ageGroups: z.array(z.string()).min(1, {
    message: "Please select at least one age group.",
  }),
  locations: z.array(z.string()).min(1, {
    message: "Please select at least one location.",
  }),
  interests: z.array(z.string()).min(1, {
    message: "Please select at least one interest.",
  }),
});

const platforms = ["Instagram", "Twitter", "LinkedIn", "Facebook"];
const adTypes = ["Image", "Video", "Carousel", "Stories"];
const ageGroups = ["13-17", "18-24", "25-34", "35-44", "45-54", "55-64", "65+"];
const locations = [
  "Tier-1 (Metro cities)",
  "Tier-2 (State capitals)",
  "Tier-3 (District headquarters)",
  "Rural areas",
];
const interests = [
  "Fitness",
  "Healthy Eating",
  "Technology",
  "Fashion",
  "Travel",
  "Eco-friendly Products",
  "Entertainment",
  "Gaming",
  "Education",
  "Finance",
];

const CampaignFormSection = () => {
  const { setActiveSection } = useDashboard();
  const { toast } = useToast();
  const [openAgeGroups, setOpenAgeGroups] = useState(false);
  const [openLocations, setOpenLocations] = useState(false);
  const [openInterests, setOpenInterests] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      platform: "",
      adType: "",
      budget: 500,
      ageGroups: [],
      locations: [],
      interests: [],
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    toast({
      title: "Campaign calculation complete",
      description: "Switching to the recommended section based on your inputs.",
    });
    
    // Determine which section to navigate to based on form data
    let targetSection = "trends";
    
    if (data.interests.includes("Fitness") || data.interests.includes("Healthy Eating")) {
      targetSection = "tracking";
    } else if (data.budget > 1000 && data.platform === "Instagram") {
      targetSection = "competitors";
    } else if (data.locations.includes("Tier-3 (District headquarters)")) {
      targetSection = "targeting";
    } else {
      targetSection = "budget";
    }
    
    // Navigate to the determined section
    setTimeout(() => {
      setActiveSection(targetSection);
    }, 1000);
  }

  return (
    <div className="section-animation">
      <h2 className="text-2xl font-bold mb-4">Campaign Setup</h2>
      <p className="text-muted-foreground mb-6">
        Configure your campaign parameters to generate optimized recommendations
      </p>

      <Card>
        <CardHeader>
          <CardTitle>Create New Campaign</CardTitle>
          <CardDescription>
            Fill in the details to set up your ad campaign
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="platform"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Platform</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select platform" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {platforms.map((platform) => (
                            <SelectItem key={platform} value={platform}>
                              {platform}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Choose the social platform for your campaign
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="adType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ad Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select ad type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {adTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Select the format for your advertisement
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="budget"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Campaign Budget ($)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormDescription>
                        Set your total campaign budget in USD
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="ageGroups"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Age Groups</FormLabel>
                      <Popover
                        open={openAgeGroups}
                        onOpenChange={setOpenAgeGroups}
                      >
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "justify-between",
                                !field.value.length &&
                                  "text-muted-foreground"
                              )}
                            >
                              {field.value.length
                                ? `${field.value.length} selected`
                                : "Select age groups"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                          <Command>
                            <CommandInput placeholder="Search age groups..." />
                            <CommandEmpty>No age group found.</CommandEmpty>
                            <CommandGroup>
                              {ageGroups.map((age) => (
                                <CommandItem
                                  value={age}
                                  key={age}
                                  onSelect={() => {
                                    const values = field.value.includes(age)
                                      ? field.value.filter((v) => v !== age)
                                      : [...field.value, age];
                                    field.onChange(values);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      field.value.includes(age)
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  {age}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormDescription>
                        Select target age demographics
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="locations"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Locations</FormLabel>
                      <Popover
                        open={openLocations}
                        onOpenChange={setOpenLocations}
                      >
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "justify-between",
                                !field.value.length &&
                                  "text-muted-foreground"
                              )}
                            >
                              {field.value.length
                                ? `${field.value.length} selected`
                                : "Select locations"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                          <Command>
                            <CommandInput placeholder="Search locations..." />
                            <CommandEmpty>No location found.</CommandEmpty>
                            <CommandGroup>
                              {locations.map((location) => (
                                <CommandItem
                                  value={location}
                                  key={location}
                                  onSelect={() => {
                                    const values = field.value.includes(location)
                                      ? field.value.filter(
                                          (v) => v !== location
                                        )
                                      : [...field.value, location];
                                    field.onChange(values);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      field.value.includes(location)
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  {location}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormDescription>
                        Choose geographic targeting options
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="interests"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Interests</FormLabel>
                      <Popover
                        open={openInterests}
                        onOpenChange={setOpenInterests}
                      >
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "justify-between",
                                !field.value.length &&
                                  "text-muted-foreground"
                              )}
                            >
                              {field.value.length
                                ? `${field.value.length} selected`
                                : "Select interests"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                          <Command>
                            <CommandInput placeholder="Search interests..." />
                            <CommandEmpty>No interest found.</CommandEmpty>
                            <CommandGroup>
                              {interests.map((interest) => (
                                <CommandItem
                                  value={interest}
                                  key={interest}
                                  onSelect={() => {
                                    const values = field.value.includes(interest)
                                      ? field.value.filter(
                                          (v) => v !== interest
                                        )
                                      : [...field.value, interest];
                                    field.onChange(values);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      field.value.includes(interest)
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  {interest}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormDescription>
                        Select audience interests for targeting
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-adblitz-green hover:bg-adblitz-lightgreen text-white"
              >
                Calculate & Generate Recommendations
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CampaignFormSection;
