"use client";

import { InputBase, styled } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'white',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function SearchButton({ defaultValue = "" }: { defaultValue?: string }) {
  const [searchTerm, setSearchTerm] = useState(defaultValue);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('search', searchTerm);
    params.set('page', '1'); 
    router.push(`/admin/users?${params.toString()}`);
  };

  return (
    <div className="flex bg-[#5A74A5] rounded overflow-hidden">
      <SearchIconWrapper>
        <SearchIcon className="text-white" />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ 'aria-label': 'search' }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
      />
    </div>
  );
}
