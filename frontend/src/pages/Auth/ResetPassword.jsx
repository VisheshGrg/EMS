import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "@/Redux/Auth/Action";
import Loader from "../Loader/Loader";

const formSchema = z
  .object({
    password: z.string().min(8, "Password must be atleast 8 characters long"),
    confirmPassword: z
      .string()
      .min(8, "Password must be atleast 8 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

const ResetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const { auth } = useSelector((store) => store);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    if (!auth.email) {
      navigate("/verifyemail");
    }
  }, [dispatch, navigate]);

  const onSubmit = (data) => {
    if (auth.email) {
      setLoading(true);
      const formData = {
        ...data,
        email: auth.email,
      };
      dispatch(resetPassword(formData, navigate)).then(() => setLoading(false));
    } else {
      navigate("/verifyEmail");
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="h-[100vh] w-[100%] flex justify-center items-center">
      <div className="space-y-6 w-[400px] p-10 rounded-xl">
        <h1 className="text-xl font-semibold">Reset Password</h1>

        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      className="border w-full border-gray-700 py-5 px-5"
                      placeholder="Password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      className="border w-full border-gray-700 py-5 px-5"
                      placeholder="Confirm Password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="w-full flex flex-row justify-around items-center">
              <Button
                variant="seconadry"
                type="submit"
                className="mt-5 w-[7rem] bg-blue-500 font-normal"
              >
                Reset
              </Button>
              <Button
                variant="seconadry"
                onClick={() => navigate("/login")}
                className="mt-5 w-[7rem] bg-gray-400 font-normal"
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

export default ResetPassword;
