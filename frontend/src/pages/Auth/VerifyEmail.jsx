import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { sendOTP } from "@/Redux/Auth/Action";
import Loader from "../Loader/Loader";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
});

const VerifyEmail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data) => {
    setLoading(true);
    dispatch(sendOTP(data, navigate)).then(() => setLoading(false));
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="h-[100vh] w-[100%] flex justify-center items-center">
      <div className="space-y-6 w-[400px] p-10 rounded-xl">
        <h1 className="text-xl font-semibold">Verify Email</h1>

        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      className="border w-full border-gray-700 py-5 px-5"
                      placeholder="Email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="w-full flex flex-row justify-around items-center">
              <Button
                variant="secondary"
                type="submit"
                className="mt-5 w-[8rem] bg-blue-500 font-medium"
              >
                Verify
              </Button>
              <Button
                variant="secondary"
                onClick={() => navigate("/login")}
                className="mt-5 w-[8rem] bg-gray-400 font-medium"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default VerifyEmail;
