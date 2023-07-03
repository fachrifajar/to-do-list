import { useState } from "react";
import { Menu, MenuItem } from "@mui/material";
import SwapVerticalCircleIcon from "@mui/icons-material/SwapVerticalCircle";
import CheckIcon from "@mui/icons-material/Check";
import CustomTheme from "../../theme";

type SortDetailProps = {
  _selectedSort: any;
};

const sortOptions = [
  { label: "Terbaru", imgSrc: "/sort-newest.png", value: "terbaru" },
  { label: "Terlama", imgSrc: "/sort-oldest.png", value: "terlama" },
  { label: "A-Z", imgSrc: "/sort-az.png", value: "a-z" },
  { label: "Z-A", imgSrc: "/sort-za.png", value: "z-a" },
  //   {
  //     label: "Belum Selesai",
  //     imgSrc: "/sort-unfinished.png",
  //     value: "belum-selesai",
  //   },
];

const SortDetail = ({ _selectedSort }: SortDetailProps) => {
  const storedTheme = localStorage.getItem("selectedTheme");
  const initialMode: "light" | "dark" =
    storedTheme === "light" || storedTheme === "dark" ? storedTheme : "light";
  const [mode, setMode] = useState<"light" | "dark">(initialMode);

  const theme = CustomTheme(mode);
  const secondaryColor = theme.palette.secondary.main;

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedSort, setSelectedSort] = useState("");

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSortSelection = (sortOption: any) => {
    setSelectedSort(sortOption);
    _selectedSort(sortOption);
    handleClose();
  };

  return (
    <>
      <SwapVerticalCircleIcon
        sx={{
          "&:hover": {
            cursor: "pointer",
            color: `${secondaryColor}`,
          },
          fontSize: { md: "40px", sm: "40px", xs: "40px" },
          mr: { md: 3, sm: 3, xs: 1 },
        }}
        onClick={handleClick}
      />
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {sortOptions.map((option) => (
          <MenuItem
            key={option.value}
            onClick={() => handleSortSelection(option.value)}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            selected={selectedSort === option.value}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}>
              <img
                src={option.imgSrc}
                alt=""
                style={{
                  height: "auto",
                  width: "25px",
                  marginRight: "15px",
                }}
              />
              <span>{option.label}</span>
            </div>
            {selectedSort === option.value && <CheckIcon />}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default SortDetail;
