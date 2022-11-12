import React, { useState } from "react";
import styled from "styled-components";
import Typography from '@mui/material/Typography';
import { darkGrey, secondaryColor } from "../scss/theme";

const Header = ({ categories, handleCategoryClick, activeCategory, setActiveCategory }) => {

    const handlePillClick = (id) => {
        setActiveCategory(id);
        handleCategoryClick(id);
    }

    return (
        <HeaderContainer>
            <Typography variant="h4" gutterRight>
                Roads & Compasses
            </Typography>
            <div className="flex">
                <AllCategories>
                    <CategoryPill onClick={() => handlePillClick(null)} active={activeCategory == null}>All</CategoryPill>
                    {
                        categories.map((category, index) => {
                            return (
                                <CategoryPill onClick={() => handlePillClick(category.id)} active={category.id === activeCategory} key={index}>
                                    {category.name}
                                </CategoryPill>
                            )
                        })
                    }
                </AllCategories>
                <img src="logout.png" className="logout" alt="logout" />
            </div>
        </HeaderContainer>
    )
}

const HeaderContainer = styled.section`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 40px;
    .logout{
        width: 40px;
        height: auto;
    }
`;

const AllCategories = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;

const CategoryPill = styled.div`
    padding: 10px 12px;
    background:  ${({ active }) => active ? darkGrey : secondaryColor};
    border-radius: 8px;
    margin-right: 20px;
    cursor: pointer;
`;

export default Header;