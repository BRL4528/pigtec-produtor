import styled from "styled-components/native";

interface TextProps {
  isActive: boolean;
}

export const Button = styled.TouchableOpacity<TextProps>`
 margin: 4px;
 padding: 8px;
 background-color: ${({ theme }) => theme.COLORS.GRAY_600};
 border: 1px solid ${props => props.isActive ? ({ theme }) => theme.COLORS.RED : ({ theme }) => theme.COLORS.GREEN_500};
 border-radius: 6px;
 justify-content: center;
 align-items: center;
 overflow: hidden;
`;

export const Text = styled.Text<TextProps>`
 /* color: ${({ theme }) => theme.COLORS.GREEN_600}; */
 color: ${props => props.isActive ? ({ theme }) => theme.COLORS.RED : ({ theme }) => theme.COLORS.GREEN_500};
 text-transform: uppercase;
 font-size: 12px;
 font-weight: bold;
`;