
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { Input, Button } from '@material-tailwind/react';

const CashOut = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        // Display SweetAlert confirmation dialog
        Swal.fire({
            title: 'Confirm Cash Out',
            text: `Are you sure you want to withdraw $${data.amount}?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes, withdraw',
            cancelButtonText: 'Cancel',
            reverseButtons: true,
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger ml-2',
            },
            buttonsStyling: false,
        }).then((result) => {
            if (result.isConfirmed) {
                // Simulate cash withdrawal (replace with actual API call)
                setTimeout(() => {
                    // Show success message
                    Swal.fire({
                        title: 'Cash Withdrawn!',
                        text: `You have successfully withdrawn $${data.amount}.`,
                        icon: 'success',
                    });
                    // Reset form after successful submission
                    reset();
                }, 1000); // Simulating a delay for cash withdrawal
            }
        });
    };

    return (
        <div className="mx-auto max-w-md p-8 bg-white rounded-md shadow-md">
            <h2 className="text-2xl font-semibold mb-6 text-center">Cash Out</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-4">
                    <div>
                        <Input
                            type="text"
                            color="indigo"
                            size="regular"
                            outline
                            label="Recipient Email / Number"
                            placeholder="Enter recipient's email or number"
                            {...register('recipientEmail', { required: 'Recipient email/number is required' })}
                        />
                        {errors.recipientEmail && <span className="text-red-500">{errors.recipientEmail.message}</span>}
                    </div>
                    <div>
                        <Input
                            type="number"
                            color="indigo"
                            size="regular"
                            outline
                            label="Amount"
                            placeholder="Enter amount"
                            {...register('amount', {
                                required: 'Amount is required',
                                pattern: {
                                    value: /^\d+(\.\d{1,2})?$/,
                                    message: 'Please enter a valid amount (up to 2 decimal places)',
                                },
                            })}
                        />
                        {errors.amount && <span className="text-red-500">{errors.amount.message}</span>}
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
                            Withdraw Cash
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CashOut;
