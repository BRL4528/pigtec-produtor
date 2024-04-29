import styled from 'styled-components/native';

interface ButtonProps {
   delete?: boolean;
}

export const Container = styled.View`
 background-color: ${({ theme }) => theme.COLORS.GRAY_600};
 height: 100%;
 padding-top: 55px;
 padding-left: 15px;
 padding-right: 15px;
 /* align-items: center; */
 /* justify-content: center; */
 /* flex: 1; */
`;

export const Text = styled.Text`
 color: ${({ theme }) => theme.COLORS.WHITE};
 margin-bottom: 35px;
 font-size: 22px;
`;

export const SectionForm = styled.View`
 /* width: 100%; */
`;

export const Button = styled.TouchableOpacity<ButtonProps>`
 /* flex: 1; */

 height: 56px;
 width: 100%;

 background-color: ${props => props.delete ? ({ theme }) => theme.COLORS.RED : ({ theme }) => theme.COLORS.GREEN_500};
 
 border-radius: 6px;

 align-items: center;
 justify-content: center;

 margin-top: 30px;
`;

export const Title = styled.Text`
 font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
 color: ${({ theme }) => theme.COLORS.WHITE};
`;

export const SectionTop = styled.View`
   align-items: center;
   flex-direction: row;
   justify-content: space-between;
   width: 90%;
   margin-bottom: 15px;
`;

export const ButtonBack = styled.TouchableOpacity`
 /* width: 50px; */
`;
export const TextButton = styled.Text`
 /* width: 50px; */
 color: ${({ theme }) => theme.COLORS.WHITE};
`;

