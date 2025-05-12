import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface CounterProps {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
  priceText: string;
}

export function Counter({ id, label, value, onChange, priceText }: CounterProps) {
  const [count, setCount] = useState(value);

  // Update internal state when external value changes
  useEffect(() => {
    setCount(value);
  }, [value]);

  const handleDecrement = () => {
    if (count > 0) {
      const newValue = count - 1;
      setCount(newValue);
      onChange(newValue);
    }
  };

  const handleIncrement = () => {
    const newValue = count + 1;
    setCount(newValue);
    onChange(newValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value) || 0;
    if (newValue >= 0) {
      setCount(newValue);
      onChange(newValue);
    }
  };

  return (
    <div>
      <label 
        htmlFor={id}
        className="block text-gray-700 font-bold mb-2"
      >
        {label}
      </label>
      <div className="flex items-center">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="rounded-r-none h-9"
          onClick={handleDecrement}
          aria-label="Decrease"
        >
          -
        </Button>
        <Input
          id={id}
          type="number"
          min="0"
          value={count}
          onChange={handleInputChange}
          className="w-16 rounded-none text-center h-9 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="rounded-l-none h-9"
          onClick={handleIncrement}
          aria-label="Increase"
        >
          +
        </Button>
        <span className="ml-4">{priceText}</span>
      </div>
    </div>
  );
}
