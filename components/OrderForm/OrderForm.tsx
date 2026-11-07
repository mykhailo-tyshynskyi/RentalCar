"use client";
import css from "./OrderForm.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { sendOrder } from "@/lib/api/cars";
import { toast } from 'react-hot-toast';

interface OrderFormProps{
    id:string
}

// Validation=====================================
const formSchema = yup
  .object({
    name: yup
      .string()
      .required("Please enter your name.")
      .min(2, "Name is too short.")
      .matches(/^([^0-9]*)$/, "Please enter correct name."), // Власна перевірка регулярним виразом

    email: yup
      .string()
      .required("Please enter your email.")
      .email("Please enter correct email."),

    comment: yup
      .string()
      .required("Comment is required")
      .min(10, "Comment is too short"),
  })
  .required();
//======================================================
export default function OrderForm({id}:OrderFormProps) {
 const { mutate, isPending, data } = useMutation({
    mutationFn: sendOrder,
      onSuccess: (data) => {
    toast.success(data.message);
  },
  onError:()=>{toast.error(`Unfortunately some error occurred`);}
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const onSubmit = ( data: {
  name: string;
  email: string;
  comment: string;
}) => {
    mutate({id,data});

  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
      <h2>Book your car now</h2>
      <p>Stay connected! We are always ready to help you.</p>
      <input type="text" placeholder="Name*" {...register("name")} />
      {errors.name && <p>{errors.name.message}</p>}
      <input type="email" placeholder="Email*" {...register("email")} />
      {errors.email && <p>{errors.email.message}</p>}
      <textarea placeholder="Comment" {...register("comment")} />
      {errors.comment && <p>{errors.comment.message}</p>}
      <button type="submit">Send</button>
    </form>
  );
}
