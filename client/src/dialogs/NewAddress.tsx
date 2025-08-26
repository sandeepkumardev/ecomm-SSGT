import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { url } from "@/lib/utils";
import useUserStore from "@/store/user.store";
import { Loader } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const NewAddress = () => {
  const { addAddress } = useUserStore();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    line1: "",
    line2: "",
    landmark: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch(`${url}/user/address`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      console.log(data);

      if (!data.success) {
        toast.error(data.error || "failed to add address!");
        return;
      }

      toast.success("address added successfully!");
      addAddress(data.data);
      setOpen(false);
    } catch (error) {
      console.log(error);
      toast.error("failed to add address!");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>New Address</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Address</DialogTitle>
          <form onSubmit={handleAdd} className="flex flex-col gap-2 mt-5">
            <div className="flex gap-2 flex-col sm:flex-row">
              <Input
                required
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                type="text"
                placeholder="full Name"
                className="w-full"
              />
              <Input
                required
                name="phone"
                value={form.phone}
                onChange={handleChange}
                type="number"
                placeholder="Phone"
                className="w-full"
              />
            </div>
            <div className="flex gap-2 flex-col sm:flex-row">
              <Input
                required
                name="line1"
                value={form.line1}
                onChange={handleChange}
                type="text"
                placeholder="Line 1"
                className="w-full"
              />
              <Input
                required
                name="line2"
                value={form.line2}
                onChange={handleChange}
                type="text"
                placeholder="Line 2"
                className="w-full"
              />
            </div>
            <div className="flex gap-2 flex-col sm:flex-row">
              <Input
                required
                name="landmark"
                value={form.landmark}
                onChange={handleChange}
                type="text"
                placeholder="landmard"
                className="w-full"
              />
              <Input
                required
                name="city"
                value={form.city}
                onChange={handleChange}
                type="text"
                placeholder="city"
                className="w-full"
              />
            </div>
            <div className="flex gap-2 flex-col sm:flex-row">
              <Input
                required
                name="country"
                value={form.country}
                onChange={handleChange}
                type="text"
                placeholder="Country"
                className="w-full"
              />
              <Input
                required
                name="postalCode"
                value={form.postalCode}
                onChange={handleChange}
                type="number"
                placeholder="Pin Code"
                className="w-full"
              />
            </div>
            <div className="justify-end flex gap-2 mt-5">
              <Button type="button" variant={"outline"}>
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
              >
                {loading ? (
                  <span className="flex items-center">
                    <Loader className="animate-spin mr-2" /> adding...
                  </span>
                ) : (
                  "Add"
                )}
              </Button>
            </div>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default NewAddress;
