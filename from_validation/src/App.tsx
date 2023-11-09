import { useForm, SubmitHandler } from "react-hook-form";
import z from "zod";
import "./App.css";
import { zodResolver } from "@hookform/resolvers/zod";

function App() {
  const signupSchema = z
    .object({
      first_name: z.string().min(1, { message: "First Name is required" }),
      last_name: z.string().min(1, { message: "last Name is required" }),
      email: z
        .string()
        .min(1, { message: "Email is required" })
        .email({ message: "Not Vaild Email" }),
      password: z
        .string()
        .min(6, { message: "password mast be at least 6 char" }),
      confirm_password: z
        .string()
        .min(6, { message: "password mast be at least 6 char" }),
    })
    .refine((data) => data.password === data.confirm_password, {
      message: "password do not match",
      path: ["confirm_password"],
    });

  type ISignUp = z.infer<typeof signupSchema>;
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<ISignUp>({
    mode: "onChange",
    resolver: zodResolver(signupSchema),
  });
  const onSubmit: SubmitHandler<ISignUp> = (data: ISignUp) => {
    console.log(data);
  };

  return (
    <>
      <h1>Create an Account</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Enter Your First Name"
          {...register("first_name")}
        />
        {errors.first_name && <span>{errors.first_name.message}</span>}
        <input
          type="text"
          placeholder="Enter Your last Name"
          {...register("last_name")}
        />
        {errors.last_name && <span>{errors.last_name.message}</span>}
        <input
          type="email"
          placeholder="Enter Your Email"
          {...register("email")}
        />
        {errors.email && <span>{errors.email.message}</span>}
        <input
          type="password"
          placeholder="Enter Your Password"
          {...register("password")}
        />
        {errors.password && <span>{errors.password.message}</span>}

        <input
          type="password"
          placeholder="Enter Your Confirm Password"
          {...register("confirm_password")}
        />
        {errors.confirm_password && (
          <span>{errors.confirm_password.message}</span>
        )}

        <button disabled={isSubmitting} type="submit">
          Sign Up
        </button>
      </form>
    </>
  );
}

export default App;
