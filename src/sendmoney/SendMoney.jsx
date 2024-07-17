import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { Input, Button } from '@material-tailwind/react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import useAxiosSecure from './../hook/useAxiosSecure';
import { useState } from 'react';
import useAuth from './../hook/useAuth';

const SendMoney = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { mutateAsync } = useMutation({
        mutationFn: async ({ email, amount, userEmail,password }) => {
            const info = { amount, userEmail,password };
            try {
                const { data } = await axiosSecure.patch(`/send-money/${email}`, info);
                return data;
            } catch (error) {
                throw new Error(error.response?.data?.message || 'Something went wrong');
            }
        },
        onSuccess: (data) => {
            Swal.fire({
                title: 'Money Sent!',
                text: `You have successfully sent $${data.recipient.amount} to ${data.recipient.email}. for ${data.charge} charge`,
                icon: 'success',
            });
            reset();
        },
        onError: (error) => {
            Swal.fire({
                title: 'Error!',
                text: error.message || 'Something went wrong.',
                icon: 'error',
            });
        },
    });

    const onSubmit = (formData) => {
        const { email, amount ,password} = formData;
        Swal.fire({
            title: 'Are you sure?',
            text: 'You want to send money to the recipient?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes, send it!',
            cancelButtonText: 'Cancel',
            reverseButtons: true,
            customClass: {
                confirmButton: 'p-3 bg-primary text-white rounded-lg',
                cancelButton: 'p-3 ml-2 border-primary',
            },
            buttonsStyling: false,
        }).then((result) => {
            if (result.isConfirmed) {
                mutateAsync({ email, amount, userEmail: user.email ,password});
            }
        });
    };

    return (
        <div className="flex justify-center items-center">
            <div className="w-2/4 p-8 bg-white rounded-md mt-20 shadow-md">
                <h2 className="text-2xl font-semibold mb-6 text-center">Send Money</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-4">
                        <div>
                            <Input
                                type="number"
                                color="indigo"
                                size="lg"
                                outline
                                label="Amount"
                                placeholder="Enter amount"
                                {...register('amount', {
                                    required: 'Amount is required',
                                    pattern: {
                                        value: /^\d+$/,
                                        message: 'Please enter a valid amount',
                                    },
                                })}
                            />
                            {errors.amount && <span className="text-red-500">{errors.amount.message}</span>}
                        </div>
                        <div>
                            <Input
                                type="text"
                                color="indigo"
                                size="regular"
                                outline
                                label="Recipient Email / Number"
                                placeholder="Enter recipient's email or number"
                                {...register('email', { required: 'Recipient email/number is required' })}
                            />
                            {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                        </div>
                        <div>
                            <Input
                                type="password"
                                color="indigo"
                                size="regular"
                                outline
                                label="Password"
                                placeholder="Enter your password"
                                {...register('password', { required: 'Password is required' })}
                            />
                            {errors.password && <span className="text-red-500">{errors.password.message}</span>}
                        </div>
                        <div className="mt-6">
                            <Button color="blue" fullWidth ripple="light" type="submit">
                                Send Money
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SendMoney;
