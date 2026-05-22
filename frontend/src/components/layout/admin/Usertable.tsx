"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Paper,
    TableContainer,
    Button,
    TextField,
    Select,
    MenuItem,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useState } from "react";

interface User {
    id: number;
    email: string;
    name: string;
    status: number;
    role: string;
    password?: string
}

export default function UserTable({ users }: { users: User[] }) {
    const router = useRouter();
    const [editingUserId, setEditingUserId] = useState<number | null>(null);
    const [formData, setFormData] = useState<Partial<User>>({});

    const handleDelete = async (id: number) => {
        try {
            const res = await fetch(`http://127.0.0.1:8000/users/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!res.ok) throw new Error("Xóa người dùng không thành công");

            toast.success("Xóa người dùng thành công");
            router.refresh();
        } catch (err) {
            console.log(err);
            toast.error("Lỗi khi xóa người dùng");
        }
    };

    const handleUpdateClick = (user: User) => {
        setEditingUserId(user.id);
        setFormData({ ...user });
    };

    const handleCancelUpdate = () => {
        setEditingUserId(null);
        setFormData({});
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
    ) => {
        const fieldName = e.target.name || "";
        const fieldValue = e.target.value;

        const updatedData: Partial<User> = { ...formData };

        if (fieldName === "status") {
            updatedData.status = Number(fieldValue);
        } else if (fieldName === "role") {
            updatedData.role = fieldValue as string;
            updatedData.status = fieldValue === "Admin" ? 1 : 2;
        } else {
            updatedData[fieldName as keyof User] = fieldValue as undefined;
        }

        setFormData(updatedData);
    };



    const handleConfirmUpdate = async () => {
        if (!editingUserId) return;
        try {
            const res = await fetch(`http://127.0.0.1:8000/users/${editingUserId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error("Cập nhật thất bại");

            toast.success("Cập nhật thành công");
            setEditingUserId(null);
            setFormData({});
            router.refresh();
        } catch (err) {
            console.error(err);
            toast.error("Lỗi khi cập nhật người dùng");
        }
    };

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Role</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell>{user.id}</TableCell>

                            <TableCell>
                                {editingUserId === user.id ? (
                                    <TextField
                                        name="email"
                                        value={formData.email || ""}
                                        onChange={handleInputChange}
                                        size="small"
                                    />
                                ) : (
                                    user.email
                                )}
                            </TableCell>

                            <TableCell>
                                {editingUserId === user.id ? (
                                    <TextField
                                        name="name"
                                        value={formData.name || ""}
                                        onChange={handleInputChange}
                                        size="small"
                                    />
                                ) : (
                                    user.name
                                )}
                            </TableCell>

                            <TableCell>
                                {editingUserId === user.id ? (
                                    <Select
                                        name="role"
                                        value={formData.role || ""}
                                        size="small"
                                        displayEmpty

                                    >
                                        <MenuItem value="" disabled>Chọn vai trò</MenuItem>
                                        <MenuItem value="User">User</MenuItem>
                                        <MenuItem value="Admin">Admin</MenuItem>
                                    </Select>
                                ) : (
                                    user.role
                                )}
                            </TableCell>

                            <TableCell>
                                {editingUserId === user.id ? (
                                    <TextField
                                        name="status"
                                        type="number"
                                        value={formData.status ?? 0}
                                        onChange={handleInputChange}
                                        size="small"
                                        disabled
                                    />
                                ) : (
                                    user.status
                                )}
                            </TableCell>

                            <TableCell>
                                {editingUserId === user.id ? (
                                    <>

                                        <Button
                                            sx={{
                                                background: "#2CA02C",
                                                color: "#fff",
                                                mr: 1,
                                                ":hover": {
                                                    background: "#258925",
                                                },
                                            }}
                                            onClick={handleConfirmUpdate}
                                        >
                                            Xác nhận
                                        </Button>

                                        <Button
                                            sx={{
                                                background: "#999",
                                                color: "#fff",
                                                ":hover": {
                                                    background: "#777",
                                                },
                                            }}
                                            onClick={handleCancelUpdate}
                                        >
                                            Hủy
                                        </Button>

                                    </>
                                ) : (
                                    <>
                                        <Button
                                            sx={{
                                                background: "#B02E35",
                                                color: "#fff",
                                                mr: 1,
                                                ":hover": {
                                                    background: "#A6282E",
                                                },
                                            }}
                                            onClick={() => handleDelete(user.id)}
                                        >
                                            Delete
                                        </Button>


                                        <Button
                                            sx={{
                                                background: "#2CA02C",
                                                color: "#fff",
                                                ":hover": {
                                                    background: "#258925",
                                                },
                                            }}
                                            onClick={() => handleUpdateClick(user)}
                                        >
                                            Update
                                        </Button>
                                    </>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
