
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { Input, Button } from '@material-tailwind/react';


const CashIn = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        Swal.fire({
            title: `Confirm Cash In`,
            text: `Are you sure you want to deposit $${data.amount} into your account?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes, deposit it!',
            cancelButtonText: 'Cancel',
            reverseButtons: true,
            customClass: {
                confirmButton: 'p-3 bg-primary text-white rounded-lg',
                cancelButton: 'p-3 ml-2 border-primary',
            },
            buttonsStyling: false,
        }).then((result) => {
            if (result.isConfirmed) {
                // Simulate cash deposit (replace with actual API call)
                setTimeout(() => {
                    Swal.fire({
                        title: 'Cash Deposited!',
                        text: `You have successfully deposited $${data.amount} into your account.`,
                        icon: 'success',
                    });
                    reset(); // Reset form after successful submission
                }, 1000); // Simulating a delay for cash deposit
            }
        });
    };

    return (
        <div className="mx-auto max-w-md p-8 bg-white rounded-md shadow-md">
            <h2 className="text-2xl font-semibold mb-6 text-center">
                {/* <CashIcon className="w-8 h-8 inline-block mr-2" />  */}Cash In
            </h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-4">
                    <div>
                        <Input
                            type="number"
                            color="indigo"
                            size="regular"
                            outline
                            label="Amount"
                            placeholder="Enter amount to deposit"
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
                    <div className="mt-6">
                        <Button color="blue" fullWidth ripple="light" type="submit">
                            Deposit Cash
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CashIn;
