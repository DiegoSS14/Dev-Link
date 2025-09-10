import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{}

export function Input(props: InputProps) {
    return (
        <input
            className="w-full border-0 h-9 bg-white text-base text-black px-2 rounded font-normal"
            {...props}
        />
    )
}