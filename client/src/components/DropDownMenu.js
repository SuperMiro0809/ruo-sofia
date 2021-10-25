import { useState } from 'react';
import { Button, List, Fade } from '@material-ui/core';
import {
    KeyboardArrowRight as ClosedIcon,
    KeyboardArrowDown as OpenedIcon
} from '@material-ui/icons';
import NavItem from './NavItem';

const DropDownMenu = (props) => {
    const Icon = props.icon;
    const elements = props.elements;
    const title = props.title;
    let [opened, setOpened] = useState(false);

    const IconStyles = {
        sx: {
           //marginLeft: '40px'
           position: 'absolute',
           left: '85%'
        },
        size: "20"
    }

    function expandMenu() {
        if (!opened) {
            setOpened(true);
        } else {
            setOpened(false);
        }
    }

    const divStyles = {
        backgroundColor: opened ? '#f4f6f8' : 'white',
        position: 'relative'
    }

    return (
        <div style={divStyles}>
            <Button
                sx={{
                    color: 'text.secondary',
                    fontWeight: 'medium',
                    justifyContent: 'flex-start',
                    letterSpacing: 0,
                    py: 1.25,
                    textTransform: 'none',
                    width: '100%',
                    ...(opened && {
                        color: 'primary.main'
                    }),
                    '& svg': {
                        mr: 1
                    }
                }}
                onClick={expandMenu}
            >
                <Icon size="20" />
                <span>{title}</span>
                {opened ? (
                    <OpenedIcon {...IconStyles} />
                ) : (
                    <ClosedIcon {...IconStyles} />
                )}
            </Button>
            {opened && (
                <Fade in={opened}>
                    <List>
                        {elements.map((el) => (
                            <NavItem
                                href={el.href}
                                key={el.title}
                                title={el.title}
                                icon={Icon}
                            />
                        ))}
                    </List>
                </Fade>
            )}
        </div>
    )
}

export default DropDownMenu;