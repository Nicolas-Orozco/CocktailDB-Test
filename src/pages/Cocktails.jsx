import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import ArrowDownwardOutlinedIcon from "@mui/icons-material/ArrowDownwardOutlined";
import Image from "material-ui-image";
import { styled } from "@mui/material/styles";
import { get } from "axios";

const CenterModal = styled(Box)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "20rem",
  padding: "1rem",
  display: "flex",
  alignItems: "center",
  backgroundColor: "#ffffff",
  color: "#000000",
  borderRadius: 6,
});
const ImageWrapper = styled(Box)({
  display: "grid",
  gap: 2,
  gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
  gridTemplateRows: "repeat(5, minmax(100px, 1fr))",
});
function Cocktails() {
  const [categories, setCategories] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [selectedDrink, setSelectedDrink] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const updateCategory = async (e) => {
    if (e) {
      const {
        data: { drinks: apiDrinks },
      } = await get(
        `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${e.target.value}`
      );
      setDrinks(apiDrinks);
    }
  };
  const getCategory = async () => {
    const {
      data: { drinks: apiCategories },
    } = await get(
      "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list"
    );
    setCategories(apiCategories);
    updateCategory();
  };
  const getDrink = async (strDrinkThumb, id, strDrink) => {
    const {
      data: {
        drinks: [{ strGlass, strAlcoholic, strTags }],
      },
    } = await get(
      `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    setSelectedDrink([
      strDrinkThumb,
      id,
      strDrink,
      strGlass,
      strAlcoholic,
      strTags,
    ]);
  };
  useEffect(() => {
    getCategory();
  }, []);
  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel id="Select Cocktail">Select</InputLabel>
        <Select
          labelId="Select Cocktail"
          label="Cocktails"
          defaultValue=""
          onChange={(e) => updateCategory(e)}
          sx={{ my: 1 }}
        >
          {categories.length ? (
            categories.map(({ strCategory }) => (
              <MenuItem value={strCategory} key={strCategory}>
                {strCategory}
              </MenuItem>
            ))
          ) : (
            <MenuItem>Loading...</MenuItem>
          )}
        </Select>
      </FormControl>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 2 }}
      >
        <Typography variant="h4" component="h3">
          Cocktails:
        </Typography>
        <Typography variant="h6" component="h4">
          {drinks.length ? (
            <>
              <ArrowDownwardOutlinedIcon
                sx={{ fontSize: 30, verticalAlign: "bottom" }}
              />
              Click one!
            </>
          ) : (
            "Choose a category"
          )}
        </Typography>
      </Stack>
      <Modal aria-labelledby="Drink Modal" open={open} onClose={handleClose}>
        <CenterModal>
          <img
            src={selectedDrink[0]}
            alt={selectedDrink[2]}
            width="100"
            height="100"
          />
          <Typography
            id="Drink Modal"
            variant="h6"
            component="h4"
            sx={{ px: 2, fontWeight: "bold", overflowWrap: "break-word" }}
          >
            <Box component="span" sx={{ color: "#58CCED" }}>
              Name: {selectedDrink[2]}
            </Box>
            <br />
            <Box component="span" sx={{ color: "#3895D3" }}>
              ID: {selectedDrink[1]}
            </Box>
            <br />
            <Box component="span" sx={{ color: "#1261A0" }}>
              Glass: {selectedDrink[3]}
            </Box>
            <br />
            <Box component="span" sx={{ color: "#072F5F" }}>
              Is Alcoholic: {selectedDrink[4] === "Alcoholic" ? "Yes" : "No"}
            </Box>
            <br />
            <Box component="span" sx={{ color: "#072F5F" }}>
              Tags: {selectedDrink[5] ? selectedDrink[5] : "None"}
            </Box>
          </Typography>
        </CenterModal>
      </Modal>
      <ImageWrapper>
        {drinks.length ? (
          drinks.map(({ strDrinkThumb, idDrink: id, strDrink }) => {
            return (
              <Image
                src={strDrinkThumb}
                alt={strDrink}
                key={id}
                onClick={async () => {
                  await getDrink(strDrinkThumb, id, strDrink);
                  await handleOpen();
                }}
                imageStyle={{
                  width: 100,
                  height: 100,
                  borderRadius: "0.5rem",
                }}
                style={{
                  backgroundColor: "hsla(0, 0%, 0%, 0)",
                  cursor: "pointer",
                }}
              />
            );
          })
        ) : (
          <LinearProgress />
        )}
      </ImageWrapper>
    </Box>
  );
}

export default Cocktails;