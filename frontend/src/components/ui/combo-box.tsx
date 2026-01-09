"use client";

import * as React from "react";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function ComboboxDemo({
  placeholder,
  loading,
  items,
  notfound,
  value,
  setValue,
}) {
  const [open, setOpen] = React.useState(false);
  const normalizedItems = items?.map((i) => {
    if (typeof i === "string") {
      return { id: i, name: i };
    }
    return i;
  });

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="
  w-full justify-between  
  !whitespace-normal md:!whitespace-nowrap 
  break-words
"
        >
          {value
            ? normalizedItems?.find((item) => item.id === value)?.name
            : placeholder}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] max-h-[300px] p-0">
        <Command>
          <CommandInput placeholder={placeholder} className="h-9" />
          <CommandList>
            <CommandEmpty>{notfound}</CommandEmpty>
            {items && items.length > 0 && (
              <CommandGroup>
                {loading ? (
                  <Loader2 className="mx-auto my-4 animate-spin" />
                ) : (
                  normalizedItems.map((item) => (
                    <CommandItem
                      key={item.id}
                      value={item.name}
                      onSelect={() => {
                        setValue(item.id);
                        setOpen(false);
                      }}
                    >
                      {item?.name || item}
                      <Check
                        className={cn(
                          "ml-auto",
                          value === item.id ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))
                )}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
