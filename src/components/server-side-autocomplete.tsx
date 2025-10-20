import {
  CommandGroup,
  CommandItem,
  CommandList,
  CommandInput,
} from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";
import { useState, useRef, useCallback, type KeyboardEvent } from "react";

import { Check, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Skeleton } from "./ui/skeleton";

// export type Option = Record<"value" | "label", string> & Record<string, string>;
export type Option = {
  value: string;
  label: string;
  rewardValue?: number;
};

type AutoCompleteProps = {
  options: Option[];
  emptyMessage: string;
  inputValue: string;
  onInputChange: (value: string) => void;
  selected: Option | null;
  onValueChange: (value: Option | null) => void;
  isLoading?: boolean;
  disabled?: boolean;
  placeholder?: string;
  isReward?: boolean;
  autoOpen?: boolean;
};

export const ServerSideAutoComplete = ({
  options,
  placeholder,
  emptyMessage,
  inputValue,
  onInputChange,
  selected,
  onValueChange,
  disabled,
  isLoading = false,
  isReward = false,
  autoOpen = true,
}: AutoCompleteProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isOpen, setOpen] = useState(false);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (!input) {
        return;
      }

      // Keep the options displayed when the user is typing
      if (!isOpen) {
        setOpen(true);
      }

      // This is not a default behaviour of the <input /> field
      if (event.key === "Enter" && input.value !== "") {
        const optionToSelect = options.find(
          (option) => option.label === input.value
        );
        if (optionToSelect) {
          onValueChange(optionToSelect);
        }
      }

      if (event.key === "Escape") {
        input.blur();
      }
    },
    [isOpen, options, onValueChange]
  );

  const handleBlur = useCallback(() => {
    setOpen(false);
    if (selected) {
      onInputChange(selected.label);
    } else {
      onInputChange("");
    }
  }, [selected]);

  const handleSelectOption = useCallback(
    (selectedOption: Option) => {
      onInputChange(selectedOption.label);

      onValueChange({
        value: selectedOption.value,
        label: selectedOption.label,
        rewardValue: isReward ? selectedOption.rewardValue || 0 : undefined,
      });

      setTimeout(() => {
        inputRef?.current?.blur();
      }, 0);
    },
    [onValueChange, isReward]
  );

  return (
    <CommandPrimitive onKeyDown={handleKeyDown} shouldFilter={false}>
      <div className="relative">
        <CommandInput
          ref={inputRef}
          value={inputValue}
          onValueChange={(search) =>
            isLoading ? undefined : onInputChange(search)
          }
          onBlur={handleBlur}
          onFocus={() => {
            setOpen(autoOpen);
          }}
          placeholder={placeholder}
          disabled={disabled}
          className="pr-2"
        />
        {selected && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-1 top-1/2 -translate-y-1/2 p-2 hover:bg-none"
            onClick={() => {
              onInputChange("");
              onValueChange(null);
            }}
          >
            <X className="h-4 w-4" aria-hidden="true" />
            <span className="sr-only">clear</span>
          </Button>
        )}
      </div>
      <div className="relative mt-1">
        <div
          className={cn(
            "animate-in fade-in-0 zoom-in-95 absolute top-0 z-10 w-full rounded-xl bg-white outline-none",
            isOpen ? "block" : "hidden"
          )}
        >
          <CommandList className="rounded-lg ring-1 ring-slate-200">
            {isLoading ? (
              <CommandPrimitive.Loading>
                <div className="p-1">
                  <Skeleton className="h-8 w-full" />
                </div>
              </CommandPrimitive.Loading>
            ) : null}
            {options.length > 0 && !isLoading ? (
              <CommandGroup>
                {options.map((option) => {
                  const isSelected = selected?.value === option.value;
                  return (
                    <CommandItem
                      key={option.value}
                      value={option.label}
                      onMouseDown={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                      }}
                      onSelect={() => handleSelectOption(option)}
                      className={cn(
                        "flex w-full items-center gap-2",
                        !isSelected ? "pl-8" : null
                      )}
                    >
                      {isSelected ? <Check className="w-4" /> : null}
                      {option.label}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            ) : null}
            {!isLoading ? (
              <CommandPrimitive.Empty className="select-none rounded-sm px-2 py-3 text-center text-sm">
                {emptyMessage}
              </CommandPrimitive.Empty>
            ) : null}
          </CommandList>
        </div>
      </div>
    </CommandPrimitive>
  );
};
