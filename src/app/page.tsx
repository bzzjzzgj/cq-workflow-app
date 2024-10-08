"use client";

import { Button } from "@/components/ui/catalyst/button";
import { RootState } from "@/lib/store";
import {
  increment,
  decrement,
  incrementByAmount,
} from "@/lib/store/slices/counterSlice";
import { useDispatch, useSelector } from "react-redux";

import "@/styles/progress-bar.css"

export default function Home() {
  const dispatch = useDispatch();
  const count = useSelector((state: RootState) => state.counter.value);

  return (
    <>
      <div className="flex flex-row gap-4 mb-4">
        <div>{count}</div>
        <Button onClick={() => dispatch(increment())}>Increment</Button>
        <Button onClick={() => dispatch(decrement())}>Decrement</Button>
        <Button onClick={() => dispatch(incrementByAmount(5))}>
          Increment By 5
        </Button>
      </div>

    </>
  );
}