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
import { sendOTP, verifyOTP } from "@/Redux/Auth/Action";
import Loader from "../Loader/Loader";

const formSchema = z.object({
  otp: z.string().min(1, "OTP is required"),
});

const VerifyOTP = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const { auth } = useSelector((store) => store);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
  });

  useEffect(() => {
    if (!auth.email) {
      navigate("/verifyEmail");
    }
  }, [dispatch, navigate]);

  const handleSendOTPAgain = (e) => {
    e.preventDefault();
    setLoading(true);
    if (auth.email) {
      dispatch(sendOTP({ email: auth.email }, navigate)).then(() =>
        setLoading(false)
      );
    } else {
      navigate("/login");
    }
  };

  const onSubmit = (data) => {
    setLoading(true);
    const formData = {
      ...data,
      email: auth.email,
      authCode: auth.authCode,
      funcType: auth.funcType,
    };
    dispatch(verifyOTP(formData, navigate)).then(() => setLoading(false));
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="h-[100vh] w-[100%] flex justify-center items-center">
      <div className="space-y-6 w-[400px] p-10 rounded-xl">
        <h3 className="text-md font-medium">We sent OTP to your mail</h3>

        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      className="border w-full border-gray-700 py-5 px-5"
                      placeholder="OTP"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="w-full flex flex-col justify-center items-center space-y-6">
              <Button
                variant="seconadry"
                type="submit"
                className="mt-5 w-[8rem] bg-blue-500 font-normal"
              >
                Verify OTP
              </Button>
              <div className="w-full flex flex-row justify-around items-center">
                <Button
                  variant="seconadry"
                  onClick={handleSendOTPAgain}
                  className="w-[7rem] bg-gray-300 font-normal text-xs"
                >
                  Send OTP again
                </Button>
                <Button
                  variant="seconadry"
                  onClick={() => navigate("/login")}
                  className="w-[7rem] bg-gray-300 font-normal text-xs"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default VerifyOTP;
