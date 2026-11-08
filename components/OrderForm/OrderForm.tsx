"use client";
import css from "./OrderForm.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { sendOrder } from "@/lib/api/cars";
import { toast } from "react-hot-toast";
import Icon from "../Icon/Icon";

interface OrderFormProps {
  id: string;
}

// Validation=====================================
const formSchema = yup
  .object({
    name: yup
      .string()
      .trim()
      .required("Please enter your name.")
      .min(2, "Please enter your full name.")
      .matches(
        /^[a-zA-Zа-яА-ЯёЁіІїЇєЄґҐ']+(?:\s+[a-zA-Zа-яА-ЯёЁіІїЇєЄґҐ']+)+$/,
        "Please enter your full name.",
      ),

    email: yup
      .string()
      .required("Please enter your email.")
      .email("Please enter correct email."),

    comment: yup
      .string()
      .required("Comment is required.")
      .min(10, "Comment is too short."),
  })
  .required();
//======================================================
export default function OrderForm({ id }: OrderFormProps) {
  const { mutate, isPending, data } = useMutation({
    mutationFn: sendOrder,
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: () => {
      toast.error(`Unfortunately some error occurred`);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const onSubmit = (data: { name: string; email: string; comment: string }) => {
    mutate({ id, data });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
      <h2 className={css.title}>Book your car now</h2>
      <p className={css.subTitle}>
        Stay connected! We are always ready to help you.
      </p>
      <div className={css.fieldsWraper}>
        <div className={`${css.field} ${errors.name ? css.error : ""}`}>
          <div className={css.wraper}>
            <input type="text" placeholder="Name*" {...register("name")} />
            {errors.name && (
              <Icon
                className={css.errorIcon}
                id={"icon-error"}
                width={24}
                height={24}
              />
            )}
          </div>
          {errors.name && (
            <p className={css.errorText}>{errors.name.message}</p>
          )}
          {errors.name && <p className={css.errorLabel}>Name*</p>}
        </div>
        <div className={`${css.field} ${errors.email ? css.error : ""}`}>
          <div className={css.wraper}>
            <input type="email" placeholder="Email*" {...register("email")} />
            {errors.email && (
              <Icon
                className={css.errorIcon}
                id={"icon-error"}
                width={24}
                height={24}
              />
            )}
          </div>
          {errors.email && (
            <p className={css.errorText}>{errors.email.message}</p>
          )}
          {errors.email && <p className={css.errorLabel}>Email*</p>}
        </div>
        <div
          className={`${css.fieldComment} ${errors.comment ? css.error : ""}`}
        >
          <div className={css.wraper}>
            <textarea placeholder="Comment" {...register("comment")} />
            {errors.comment && (
              <Icon
                className={css.errorIcon}
                id={"icon-error"}
                width={24}
                height={24}
              />
            )}
          </div>
          {errors.comment && (
            <p className={css.errorText}>{errors.comment.message}</p>
          )}
        </div>
      </div>
      <button type="submit" className={css.btn}>
        {isPending ? "Sending" : "Send"}
        {isPending && <div className={css.spinner} />}
      </button>
    </form>
  );
}
